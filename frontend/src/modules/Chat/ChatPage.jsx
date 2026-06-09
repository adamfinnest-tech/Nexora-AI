import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { useFetch } from '../../hooks/useFetch';

const Chat = ({ currentChatId, onChatCreated, onMenuClick }) => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [agentStatus, setAgentStatus] = useState(null);
  
  const abortControllerRef = useRef(null);
  const statusIntervalRef = useRef(null);

  const clearStatusInterval = () => {
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearStatusInterval();
  }, []);

  const { data: chatData, error: chatError } = useFetch(
    currentChatId ? `/chat/${currentChatId}` : null,
    {},
    [currentChatId]
  );

  useEffect(() => {
    if (chatData) {
      setMessages(chatData.messages || []);
    } else if (!currentChatId) {
      setMessages([]);
    }
  }, [chatData, currentChatId]);

  useEffect(() => {
    if (chatError) {
      setMessages([{ role: 'ai', content: '⚠️ Failed to load chat history.', _id: 'error' }]);
    }
  }, [chatError]);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    clearStatusInterval();
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add user message immediately
    const userMsg = { role: 'user', content: text, _id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setIsListening(true); // Show listening/thinking indicator

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const token = localStorage.getItem('token');
      
      // If no chat session exists, create one
      let chatId = currentChatId;
      if (!chatId) {
        const createRes = await fetch('http://localhost:5000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title: text.substring(0, 30) }),
          signal: abortController.signal
        });
        const chatData = await createRes.json();
        chatId = chatData._id;
        if (onChatCreated) onChatCreated(chatId);
      }

      // Send the message and read stream
      const response = await fetch(`http://localhost:5000/api/chat/${chatId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: text }),
        signal: abortController.signal
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server error');
      }

      if (!response.body) throw new Error('ReadableStream not yet supported in this browser.');
      
      // Hide listening indicator as soon as stream starts
      setIsListening(false);
      setStreamingMessage('');
      setAgentStatus('Thinking...');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let streamedContent = '';
      let buffer = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: !done });
          
          const parts = buffer.split('\n\n');
          buffer = parts.pop() || '';
          
          for (const part of parts) {
            if (part.startsWith('data: ')) {
              try {
                const dataStr = part.substring(6);
                if (!dataStr.trim()) continue;
                
                const data = JSON.parse(dataStr);
                
                if (data.type === 'token') {
                  clearStatusInterval();
                  streamedContent += data.content;
                  setStreamingMessage(streamedContent);
                  setAgentStatus(null); // clear status when tokens arrive
                } else if (data.type === 'tool_start') {
                  if (data.content.includes('tavily_search')) {
                    const searchStatuses = [
                      "Searching the web...",
                      "Analyzing relevant sources...",
                      "Extracting key insights...",
                      "Synthesizing information..."
                    ];
                    setAgentStatus(searchStatuses[0]);
                    let step = 1;
                    clearStatusInterval();
                    statusIntervalRef.current = setInterval(() => {
                      setAgentStatus(searchStatuses[step % searchStatuses.length]);
                      step++;
                    }, 2000);
                  } else {
                    clearStatusInterval();
                    setAgentStatus(data.content);
                  }
                } else if (data.type === 'tool_end') {
                  // Keep status active if needed, or clear it
                  // setAgentStatus(null); 
                } else if (data.type === 'done') {
                  clearStatusInterval();
                  setAgentStatus(null);
                } else if (data.type === 'error') {
                  clearStatusInterval();
                  console.error("Backend Error:", data.content);
                  setAgentStatus(null);
                  streamedContent = `⚠️ **Error:** ${data.content}`;
                }
              } catch (e) {
                console.error("Failed to parse SSE data", e, part);
              }
            }
          }
        }
      }

      // Finalize the streamed message
      clearStatusInterval();
      if (streamedContent.trim()) {
        setMessages(prev => [...prev, { role: 'ai', content: streamedContent, _id: Date.now().toString() }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Sorry, I encountered an issue and could not generate a response.', _id: Date.now().toString() }]);
      }
      setStreamingMessage('');
      setAgentStatus(null);

    } catch (error) {
      clearStatusInterval();
      if (error.name === 'AbortError') {
        setMessages(prev => [...prev, { role: 'ai', content: '🛑 Generation stopped by user.', _id: Date.now().toString() }]);
        setIsListening(false);
        setStreamingMessage('');
        setAgentStatus(null);
        return;
      }
      console.error('Failed to send message:', error);
      setIsListening(false);
      setStreamingMessage('');
      setAgentStatus(null);
      setMessages(prev => [...prev, { role: 'ai', content: `⚠️ ${error.message || 'I encountered an error while processing your request. Please ensure the backend is running and try again.'}`, _id: Date.now().toString() }]);
    }
  };

  const isProcessing = isListening || !!agentStatus || streamingMessage.length > 0;

  return (
    <div className="flex-1 h-[calc(100vh-3rem)] my-6 mr-6 ml-3 flex flex-col p-4 md:p-5 lg:p-4 overflow-hidden relative bg-white/30 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]">
      <ChatHeader onMenuClick={onMenuClick} />
      <ChatWindow 
        isListening={isListening} 
        messages={messages} 
        streamingMessage={streamingMessage} 
        agentStatus={agentStatus}
      />
      <InputBar 
        isListening={isListening} 
        setIsListening={setIsListening} 
        onSendMessage={handleSendMessage} 
        disabled={isProcessing}
        onStop={handleStop}
      />
    </div>
  );
};

export default Chat;
