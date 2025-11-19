# My Digital Twin - AI Profile Assistant

An AI-powered professional profile assistant using RAG (Retrieval-Augmented Generation) technology, built with Next.js, Upstash Vector, and Groq.

## Overview

This project implements a digital twin MCP (Model Context Protocol) server that can answer questions about your professional background, skills, achievements, and experience. It's designed to help with interview preparation and professional representation.

## Features

- **RAG-Powered Search**: Semantic search across your professional profile using Upstash Vector Database
- **Fast AI Responses**: Lightning-fast responses using Groq's LLM inference
- **STAR Methodology**: Achievements structured using Situation-Task-Action-Result format
- **MCP Integration**: Works with GitHub Copilot and Claude Desktop via Model Context Protocol
- **Type-Safe**: Built with TypeScript for reliability and maintainability

## Tech Stack

- **Framework**: Next.js 15.5.3+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (dark mode)
- **Vector Database**: Upstash Vector with built-in embeddings
- **LLM**: Groq (llama-3.1-8b-instant)
- **Protocol**: Model Context Protocol (MCP)

## Prerequisites

- Node.js 18+ and npm
- Upstash Vector Database account (free tier available)
- Groq API key (free tier available)
- VS Code Insiders (for MCP testing with GitHub Copilot)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```env
UPSTASH_VECTOR_REST_URL="your-upstash-url"
UPSTASH_VECTOR_REST_TOKEN="your-upstash-token"
GROQ_API_KEY="your-groq-api-key"
```

### 3. Customize Your Profile

Edit the digital twin JSON data (to be created) with your:
- Professional experience and achievements
- Technical and soft skills
- Projects and portfolio
- Education background
- Career goals
- Interview preparation Q&A

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
mydigitaltwin/
├── app/
│   ├── actions/
│   │   └── digital-twin.ts  # Server actions for RAG queries
│   ├── api/
│   │   └── mcp/
│   │       └── route.ts     # MCP protocol endpoint
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Interactive testing UI
│   └── globals.css          # Global styles
├── .vscode/
│   └── mcp.json             # MCP client configuration
├── agents.md                # GitHub Copilot instructions
├── .env.local               # Environment variables (not in git)
├── SETUP_INSTRUCTIONS.md    # Detailed setup guide
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Architecture

### RAG Query Flow

1. User asks question via MCP
2. Server action receives question
3. Query Upstash Vector for top 3 relevant content chunks
4. Extract content from search results
5. Build prompt with context for Groq
6. Generate first-person response using Groq LLM
7. Return response to user

### Data Structure

Professional profile data is organized as content chunks:

```typescript
{
  id: string,
  title: string,
  type: "achievement" | "skill" | "project" | "education" | ...,
  content: string,
  metadata: {
    category: string,
    tags: string[],
    ...
  }
}
```

## Development

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## MCP Integration

This server implements the Model Context Protocol, allowing AI assistants like GitHub Copilot and Claude Desktop to query your professional profile.

### Quick Test
```bash
# Test MCP endpoint
curl http://localhost:3000/api/mcp

# Test ping method
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"ping","id":1}'
```

### VS Code Insiders + GitHub Copilot

1. Open VS Code Insiders
2. Press `Cmd+Shift+P` → "GitHub Copilot: Enable MCP Servers"
3. Select `.vscode/mcp.json`
4. Restart VS Code
5. Test: `@workspace Using my digital twin, what are my skills?`

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "digital-twin": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed configuration steps.

## Deployment to Vercel

This project is deployed on Vercel for 24/7 availability.

### Deploy Your Own

1. Push to GitHub:
```bash
git remote add origin https://github.com/yourusername/mydigitaltwin.git
git push -u origin main
```

2. Deploy on Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `UPSTASH_VECTOR_REST_URL`
     - `UPSTASH_VECTOR_REST_TOKEN`
     - `GROQ_API_KEY`
   - Deploy!

3. Your digital twin will be live at: `https://yourproject.vercel.app`

## Completed Features

- [✅] Implement MCP server actions
- [✅] Add server-side RAG query logic
- [✅] Create MCP API endpoint (/api/mcp)
- [✅] Interactive web UI for testing
- [✅] Database status checking
- [✅] MCP protocol compliance (JSON-RPC 2.0)
- [✅] TypeScript with strict types
- [✅] Production build optimized
- [✅] 36 content chunks loaded in Upstash

## Future Enhancements

- [ ] Create profile data management UI
- [ ] Add analytics and query logging
- [ ] Add authentication for profile editing
- [ ] Implement caching for frequent queries
- [ ] Add multi-language support

## Resources

- [Upstash Vector Documentation](https://upstash.com/docs/vector)
- [Groq API Documentation](https://console.groq.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT

## Author

Eshaan Gupta

---

Built as part of the Digital Twin Workshop - Week 5
