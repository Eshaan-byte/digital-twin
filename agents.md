# Digital Twin MCP Server Project Instructions

## Project Overview
Build an MCP server using the roll dice pattern to create a digital twin assistant that can answer questions about a person's professional profile using RAG (Retrieval-Augmented Generation).

## Reference Repositories
- **Pattern Reference**: https://github.com/gocallum/rolldice-mcpserver.git
  - Roll dice MCP server - use same technology and pattern for our MCP server
- **Logic Reference**: https://github.com/gocallum/binal_digital-twin_py.git
  - Python code using Upstash Vector for RAG search with Groq and LLaMA for generations

## Core Functionality
- MCP server accepts user questions about the person's professional background
- Create server actions that search Upstash Vector database and return RAG results
- Search logic must match the Python version exactly

## Environment Variables (.env.local)
```
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
GROQ_API_KEY=
```

## Technical Requirements
- **Framework**: Next.js 15.5.3+ (use latest available)
- **Package Manager**: Always use npm (never yarn or pnpm)
- **Commands**: Always use macOS/Unix commands (we're on Darwin)
- **Type Safety**: Enforce strong TypeScript type safety throughout
- **Architecture**: Always use server actions where possible
- **Styling**: Use globals.css instead of inline styling
- **UI Framework**: Tailwind CSS with dark mode theme
- **Focus**: Prioritize MCP functionality over UI - UI is primarily for MCP server configuration

## Upstash Vector Integration

### Key Documentation
- Getting Started: https://upstash.com/docs/vector/overall/getstarted
- Embedding Models: https://upstash.com/docs/vector/features/embeddingmodels
- TypeScript SDK: https://upstash.com/docs/vector/sdks/ts/getting-started

### Example Implementation
```typescript
import { Index } from "@upstash/vector"

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
})

// RAG search example
await index.query({
  data: "What is your experience with Python?",
  topK: 3,
  includeMetadata: true,
})
```

## Groq Integration

### TypeScript SDK
```typescript
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

const completion = await groq.chat.completions.create({
  messages: [
    {
      role: "system",
      content: "You are an AI digital twin. Answer in first person."
    },
    {
      role: "user",
      content: prompt
    }
  ],
  model: "llama-3.1-8b-instant",
  temperature: 0.7,
  max_tokens: 500,
})
```

## Digital Twin Data Structure

The professional profile data is structured as content chunks with the following format:

```typescript
interface ContentChunk {
  id: string;
  title: string;
  type: string;
  content: string;
  metadata: {
    category: string;
    tags: string[];
    [key: string]: any;
  };
}
```

Content types include:
- `personal`: Introduction and overview
- `achievement`: STAR-formatted achievements
- `skill`: Technical and soft skills
- `project`: Portfolio projects
- `education`: Educational background
- `career_goals`: Career aspirations
- `interview_prep`: Common interview Q&A

## MCP Server Actions to Implement

1. **Initialize Digital Twin**: Load professional profile data into Upstash Vector
2. **Query Digital Twin**: Accept question, perform RAG search, generate response
3. **List Topics**: Return available topics/categories from profile
4. **Get Achievement**: Retrieve specific STAR-formatted achievement

## RAG Query Flow

1. User asks question through MCP
2. Server action receives question
3. Query Upstash Vector for top 3 relevant content chunks
4. Extract content from search results
5. Build prompt with context for Groq
6. Generate first-person response using Groq
7. Return response to user

## Error Handling
- Validate environment variables exist
- Handle Upstash Vector connection errors
- Handle Groq API errors with proper messages
- Implement retry logic for transient failures
- Return user-friendly error messages

## Testing Strategy
- Test vector database connection
- Test RAG query flow end-to-end
- Test MCP protocol compatibility
- Test error scenarios

## Additional Useful Resources
- MCP Protocol Documentation: https://modelcontextprotocol.io/
- Next.js Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- TypeScript Best Practices: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html

---

**Note**: This file provides context for GitHub Copilot to generate accurate, project-specific code suggestions. Keep it updated as requirements evolve.
