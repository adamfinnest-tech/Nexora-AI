# Nexora AI – Intelligent Business Research Copilot

Nexora AI is a next-generation Executive Business Analyst and Research Copilot. Moving beyond traditional text-only LLM interfaces, Nexora AI utilizes agentic web search to extract real-time business intelligence and renders it directly into a premium, interactive UI. 

Whether you need a SWOT analysis, competitor comparisons, public contact details, or visual media intelligence, Nexora AI synthesizes the web into actionable, beautiful dashboard cards.

---

## 🌟 Implemented Features

### 👤 User Authentication
*   Login / Signup
*   Google OAuth Integration
*   Protected Routes

### 💬 Chat Interface
*   AI-Powered Research Assistant
*   Chat History & Conversation Context Retention
*   Responsive UI & Modern AI Dashboard

### 📊 Business Intelligence
*   Company Analysis & Competitor Analysis
*   Market Research Reports
*   Contact Information Discovery
*   Company Image Discovery
*   Research Sources

### 🧠 Hybrid Memory Architecture

**Short-Term Memory:**
*   Recent conversation history is retained within active chat sessions for immediate contextual awareness.

**Long-Term Memory (Brain):**
*   **Brain Collection:** A specialized database collection for persistent facts.
*   **Memory Management Page:** Users can view and manage their stored facts.
*   **User Fact Storage:** Personal preferences and facts are stored seamlessly across different chats.
*   *Example:* Telling the AI *"My company is fornax gaming"* is automatically extracted and stored as a long-term memory so the AI remembers it in future conversations.

---

## 🛠 Tech Stack

**Frontend**
*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS + Custom CSS Keyframes
*   **Icons:** Lucide React
*   **Markdown Parsing:** React-Markdown + Remark-GFM
*   **Authentication:** Google OAuth Provider (`@react-oauth/google`)

**Backend**
*   **Runtime:** Node.js + Express
*   **Database:** MongoDB (Mongoose)
*   **AI Engine:** Google Gemini 2.5 Flash
*   **Agent Orchestration:** LangChain & LangGraph (`@langchain/langgraph`)
*   **Tooling/Search:** Tavily API (`@tavily/core`), Composio (`@composio/core`)

---

## 🚀 Installation

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB instance (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/adamrifs/Nexora-AI.git
cd Nexora-AI
```

### 2. Setup the Backend
```bash
cd backend
npm install
# Run the development server
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
# Run the development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in both the `backend` and `frontend` directories using the following references.

### `backend/.env`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

# External APIs
GEMINI_API_KEY=your_google_gemini_key
TAVILY_API_KEY=your_tavily_search_key
COMPOSIO_API_KEY=your_composio_key

# OAuth
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

---

## 🌐 Live Demo

*   **Application URL:** https://nexora-ai-flame.vercel.app/


---

## 🏗 Architecture Overview

Nexora AI relies on a highly specialized Prompt Engineering & UI Intercept architecture:

1.  **The Request:** The user asks a business question. The query is sent to the Express backend.
2.  **Agentic Routing (LangGraph):** A `StateGraph` determines if tools are needed. The agent is forced to use the `tavily_search` tool for company inquiries.
3.  **Structured Generation:** The AI system prompt mandates that specific data (Contacts, Media, SWOT) must be generated as strictly formatted XML blocks appended to the end of the markdown response.
4.  **Real-Time Streaming:** The response is streamed token-by-token via SSE back to the frontend.
5.  **UI Interception:** The frontend `EnhancedMessageRenderer` strips out the hidden XML payload blocks in real-time. It parses the data and dynamically mounts premium React components (`<CompanyContactCard />`, `<MediaGallery />`) at the top of the chat view, while rendering the remaining markdown below it.

---

## 🔮 Future Improvements

1.  **Parallel Agent Execution:** Refactor the LangGraph implementation to execute web scraping and data extraction nodes in parallel to reduce Time-To-First-Byte (TTFB).
2.  **PDF/CSV Export:** Allow users to export generated business intelligence dashboards into styled PDF reports or CSV datasets.
3.  **Expanded Integrations:** Utilize the existing Composio infrastructure to push research notes directly to Notion, Slack, or Salesforce.
4.  **Advanced Tool Calling:** Implement a dedicated web-scraping node (e.g., Browserbase/Stagehand) to crawl highly specific proprietary websites that standard search APIs miss.
