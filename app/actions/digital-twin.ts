"use server"

import { Index } from "@upstash/vector"
import Groq from "groq-sdk"

// Types for our digital twin data
interface ContentChunk {
  id: string
  title: string
  type: string
  content: string
  metadata: {
    category: string
    tags: string[]
    [key: string]: any
  }
}

interface QueryResult {
  id: string
  score: number
  metadata?: {
    title?: string
    content?: string
    type?: string
    category?: string
    tags?: string[]
  }
}

interface RAGResponse {
  success: boolean
  answer?: string
  sources?: Array<{
    title: string
    relevance: number
  }>
  error?: string
}

// Initialize Upstash Vector client
function getVectorIndex() {
  const url = process.env.UPSTASH_VECTOR_REST_URL
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN

  if (!url || !token) {
    throw new Error("Missing Upstash Vector credentials in environment variables")
  }

  return new Index({
    url,
    token,
  })
}

// Initialize Groq client
function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY in environment variables")
  }

  return new Groq({ apiKey })
}

/**
 * Query the digital twin using RAG
 * Matches the Python implementation logic
 */
export async function queryDigitalTwin(question: string): Promise<RAGResponse> {
  try {
    if (!question || question.trim().length === 0) {
      return {
        success: false,
        error: "Question cannot be empty",
      }
    }

    // Step 1: Query vector database
    const index = getVectorIndex()

    console.log("Querying with question:", question)
    console.log("Using index URL:", process.env.UPSTASH_VECTOR_REST_URL)
    console.log("Token present:", !!process.env.UPSTASH_VECTOR_REST_TOKEN)

    let results
    try {
      results = await index.query({
        data: question,
        topK: 3,
        includeMetadata: true,
      })
      console.log("Query returned results:", results?.length || 0)
      console.log("Results object:", JSON.stringify(results, null, 2))
    } catch (queryError) {
      console.error("Error during index.query:", queryError)
      throw queryError
    }

    if (!results || results.length === 0) {
      // Try to get database info to debug
      try {
        const dbInfo = await index.info()
        console.log("Database info:", dbInfo)
      } catch (e) {
        console.log("Could not get db info:", e)
      }

      return {
        success: true,
        answer: "I don't have specific information about that topic in my profile.",
        sources: [],
      }
    }

    // Step 2: Extract relevant content
    const topDocs: string[] = []
    const sources: Array<{ title: string; relevance: number }> = []

    for (const result of results) {
      const metadata = result.metadata || {} as any
      const title = metadata.title || "Information"
      const content = metadata.content || ""
      const score = result.score || 0

      if (content) {
        topDocs.push(`${title}: ${content}`)
        sources.push({ title, relevance: score })
      }
    }

    if (topDocs.length === 0) {
      return {
        success: true,
        answer: "I found some information but couldn't extract specific details.",
        sources: [],
      }
    }

    // Step 3: Generate response with Groq
    const groq = getGroqClient()
    const context = topDocs.join("\n\n")

    const prompt = `Based on the following information about yourself, answer the question.
Speak in first person as if you are describing your own background.

Your Information:
${context}

Question: ${question}

Provide a helpful, professional response:`

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an AI digital twin representing Eshaan Gupta. Answer questions as if you are the person, speaking in first person about your background, skills, and experience. Be professional, concise, and highlight relevant achievements.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_tokens: 500,
      })

      const answer = completion.choices[0]?.message?.content?.trim() || "Unable to generate response"

      return {
        success: true,
        answer,
        sources,
      }
    } catch (groqError) {
      console.error("Error calling Groq API:", groqError)
      return {
        success: false,
        error: `Groq API error: ${groqError instanceof Error ? groqError.message : "Unknown error"}`,
      }
    }
  } catch (error) {
    console.error("Error in queryDigitalTwin:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Get database info (for debugging/status checks)
 */
export async function getDatabaseInfo() {
  try {
    const index = getVectorIndex()
    const info = await index.info()

    return {
      success: true,
      vectorCount: info.vectorCount || 0,
      dimension: info.dimension || 0,
      similarityFunction: info.similarityFunction || "unknown",
    }
  } catch (error) {
    console.error("Error getting database info:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * List available topics from the digital twin profile
 */
export async function listTopics(): Promise<string[]> {
  try {
    // Common categories in the digital twin profile
    return [
      "Personal Introduction",
      "Technical Skills",
      "Projects & Achievements",
      "Work Experience",
      "Education",
      "Career Goals",
      "Interview Preparation",
      "Soft Skills",
    ]
  } catch (error) {
    console.error("Error listing topics:", error)
    return []
  }
}
