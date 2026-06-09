const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage } = require('@langchain/core/messages');
const { Composio } = require('@composio/core');
const { LangchainProvider } = require('@composio/langchain');

async function run() {
  const composio = new Composio({
    apiKey: process.env.COMPOSIO_API_KEY,
    provider: new LangchainProvider()
  });
  
  const tools = await composio.tools.get('default', { toolkits: ['gmail', 'googlecalendar'] });
  
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    apiKey: process.env.GEMINI_API_KEY,
    streaming: true
  }).bindTools(tools);
  
  try {
    const res = await llm.invoke([new HumanMessage('Use your tools to find an email from John')]);
    console.log('Success!', res.tool_calls);
  } catch (e) {
    console.error('Error:', e);
  }
}

run().catch(console.error);
