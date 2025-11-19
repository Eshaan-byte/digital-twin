import { NextRequest, NextResponse } from "next/server"
import { queryDigitalTwin, getDatabaseInfo, listTopics } from "@/app/actions/digital-twin"

/**
 * MCP Server API Endpoint
 * Implements Model Context Protocol for AI agent integration
 * Following the pattern from rolldice-mcpserver
 */

interface MCPRequest {
  jsonrpc: string
  method: string
  params?: any
  id: number | string
}

interface MCPResponse {
  jsonrpc: string
  result?: any
  error?: {
    code: number
    message: string
  }
  id: number | string
}

/**
 * Handle MCP protocol requests
 * POST /api/mcp
 */
export async function POST(request: NextRequest) {
  try {
    const body: MCPRequest = await request.json()

    // Validate JSON-RPC 2.0 format
    if (body.jsonrpc !== "2.0") {
      return NextResponse.json(
        {
          jsonrpc: "2.0",
          error: {
            code: -32600,
            message: "Invalid Request: jsonrpc must be '2.0'",
          },
          id: body.id || null,
        },
        { status: 400 }
      )
    }

    // Route to appropriate handler based on method
    let result: any

    switch (body.method) {
      case "ping":
        result = { status: "ok", message: "Digital Twin MCP server is running" }
        break

      case "query":
        if (!body.params || !body.params.question) {
          return createErrorResponse(body.id, -32602, "Missing 'question' parameter")
        }
        result = await handleQuery(body.params.question)
        break

      case "status":
        result = await handleStatus()
        break

      case "topics":
        result = await handleTopics()
        break

      case "initialize":
        result = await handleInitialize()
        break

      default:
        return createErrorResponse(body.id, -32601, `Method not found: ${body.method}`)
    }

    // Return successful response
    const response: MCPResponse = {
      jsonrpc: "2.0",
      result,
      id: body.id,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("MCP API Error:", error)
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : "Internal error",
        },
        id: null,
      },
      { status: 500 }
    )
  }
}

/**
 * Handle GET requests - return server info
 */
export async function GET() {
  return NextResponse.json({
    name: "Digital Twin MCP Server",
    version: "1.0.0",
    description: "AI-powered digital twin for interview preparation using RAG",
    methods: [
      {
        name: "ping",
        description: "Check if server is running",
        params: [],
      },
      {
        name: "query",
        description: "Ask a question about the professional profile",
        params: ["question: string"],
      },
      {
        name: "status",
        description: "Get database status and vector count",
        params: [],
      },
      {
        name: "topics",
        description: "List available topics in the profile",
        params: [],
      },
      {
        name: "initialize",
        description: "Initialize and verify MCP server setup",
        params: [],
      },
    ],
    endpoints: {
      mcp: "/api/mcp",
    },
  })
}

// Helper Functions

function createErrorResponse(id: number | string | null, code: number, message: string): NextResponse {
  return NextResponse.json(
    {
      jsonrpc: "2.0",
      error: { code, message },
      id: id || null,
    },
    { status: 400 }
  )
}

async function handleQuery(question: string) {
  const response = await queryDigitalTwin(question)

  if (!response.success) {
    throw new Error(response.error || "Query failed")
  }

  return {
    answer: response.answer,
    sources: response.sources || [],
    question: question,
  }
}

async function handleStatus() {
  const dbInfo = await getDatabaseInfo()

  return {
    server: "Digital Twin MCP Server",
    status: "operational",
    database: {
      connected: dbInfo.success,
      vectorCount: dbInfo.vectorCount || 0,
      dimension: dbInfo.dimension || 0,
    },
    model: "llama-3.1-8b-instant (via Groq)",
  }
}

async function handleTopics() {
  const topics = await listTopics()

  return {
    topics,
    count: topics.length,
  }
}

async function handleInitialize() {
  const dbInfo = await getDatabaseInfo()

  if (!dbInfo.success) {
    throw new Error("Failed to connect to database: " + dbInfo.error)
  }

  if (dbInfo.vectorCount === 0) {
    return {
      initialized: false,
      message: "No vectors found in database. Please run the Python embedding script first.",
      database: dbInfo,
    }
  }

  return {
    initialized: true,
    message: "MCP server is ready!",
    database: {
      vectorCount: dbInfo.vectorCount,
      dimension: dbInfo.dimension,
    },
  }
}
