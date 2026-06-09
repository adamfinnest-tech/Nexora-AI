const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');
const Brain = require('../models/Brain');

/**
 * Analyzes a user message to extract structured long-term memories.
 * Saves extracted facts to the Brain collection.
 * 
 * @param {string} userId - The ID of the user
 * @param {string} messageContent - The raw text of the user's message
 */
const extractAndSaveMemories = async (userId, messageContent) => {
  if (!process.env.GEMINI_API_KEY) return;
  if (!messageContent || messageContent.trim() === '') return;

  try {
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GEMINI_API_KEY,
      temperature: 0.1, // Low temperature for consistent JSON extraction
      maxRetries: 1,
    });

    const systemPrompt = `You are a highly precise Memory Extraction Service.
Your ONLY job is to analyze the user's message and extract any important, persistent personal or business facts.

You must ignore generic statements, greetings ("hello", "thanks"), questions, and temporary information.
ONLY extract persistent facts. Examples:
- Name
- Company Name
- Location / Address
- Industry
- Business Goals
- Specific personal preferences

If you find a fact, extract it as a JSON array of objects. Each object MUST have:
1. "key": A short, snake_case identifier (e.g., "name", "company", "location", "industry", "business_focus").
2. "value": The extracted fact.
3. "category": Either "Personal" or "Business".

Rules:
- Output NOTHING but valid JSON.
- Do NOT wrap in markdown formatting blocks (no \`\`\`json). Just the raw JSON array.
- If no facts are found, output an empty array: []

Example:
User: "Hi, I'm Adam and I run a gaming company called Fornax Gaming based in Kochi."
Output:
[
  { "key": "name", "value": "Adam", "category": "Personal" },
  { "key": "company", "value": "Fornax Gaming", "category": "Business" },
  { "key": "location", "value": "Kochi", "category": "Business" }
]`;

    const response = await llm.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(messageContent)
    ]);

    let outputText = response.content.trim();
    // Clean up potential markdown formatting from Gemini
    if (outputText.startsWith('```json')) {
      outputText = outputText.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (outputText.startsWith('```')) {
      outputText = outputText.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const memories = JSON.parse(outputText);

    if (!Array.isArray(memories) || memories.length === 0) {
      console.log(`[Memory Extractor] Memory Ignored: No facts detected in message.`);
      return;
    }

    console.log(`[Memory Extractor] Memory Detected: Found ${memories.length} facts.`);

    // Persist to MongoDB
    for (const mem of memories) {
      const { key, value, category } = mem;
      if (!key || !value) continue;

      // Check if memory key already exists for this user
      const existingMemory = await Brain.findOne({ userId, key });

      const factString = `${key}: ${value}`;

      if (existingMemory) {
        // Update existing
        if (existingMemory.value !== value) {
          existingMemory.value = value;
          existingMemory.fact = factString;
          existingMemory.category = category || existingMemory.category;
          await existingMemory.save();
          console.log(`[Memory Extractor] Memory Updated: key="${key}", value="${value}"`);
        } else {
            console.log(`[Memory Extractor] Memory Ignored (Duplicate): key="${key}", value="${value}"`);
        }
      } else {
        // Create new
        await Brain.create({
          userId,
          key,
          value,
          fact: factString,
          category: category || 'Personal',
          importance: 'Medium'
        });
        console.log(`[Memory Extractor] Memory Created: key="${key}", value="${value}"`);
      }
    }

  } catch (error) {
    console.error("[Memory Extractor Error]:", error.message);
    // We swallow errors here so that if extraction fails, it doesn't break the main chat flow
  }
};

module.exports = { extractAndSaveMemories };
