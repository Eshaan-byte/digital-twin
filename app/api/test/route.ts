import { NextResponse } from 'next/server'

export async function GET() {
  const env = {
    hasUpstashUrl: !!process.env.UPSTASH_VECTOR_REST_URL,
    hasUpstashToken: !!process.env.UPSTASH_VECTOR_REST_TOKEN,
    hasGroqKey: !!process.env.GROQ_API_KEY,
    upstashUrlPreview: process.env.UPSTASH_VECTOR_REST_URL?.substring(0, 30) + '...',
  }

  return NextResponse.json(env)
}
