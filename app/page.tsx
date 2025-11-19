"use client"

import { useState } from "react"
import { queryDigitalTwin, getDatabaseInfo } from "./actions/digital-twin"

export default function Home() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<Array<{ title: string; relevance: number }>>([])
  const [loading, setLoading] = useState(false)
  const [dbInfo, setDbInfo] = useState<any>(null)

  const handleQuery = async () => {
    if (!question.trim()) return

    setLoading(true)
    setAnswer("")
    setSources([])

    try {
      const result = await queryDigitalTwin(question)
      if (result.success) {
        setAnswer(result.answer || "")
        setSources(result.sources || [])
      } else {
        setAnswer(`Error: ${result.error}`)
      }
    } catch (error) {
      setAnswer(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const checkDatabase = async () => {
    const info = await getDatabaseInfo()
    setDbInfo(info)
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">My Digital Twin MCP Server</h1>
        <p className="text-xl mb-8 text-gray-400">
          AI-powered professional profile assistant using RAG technology
        </p>

        {/* Database Status */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Server Status</h2>
            <button
              onClick={checkDatabase}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Check Database
            </button>
          </div>
          {dbInfo && (
            <div className="mt-4 text-gray-300">
              <p>Status: {dbInfo.success ? "✅ Connected" : "❌ Error"}</p>
              {dbInfo.success && (
                <>
                  <p>Vectors: {dbInfo.vectorCount}</p>
                  <p>Dimension: {dbInfo.dimension}</p>
                </>
              )}
              {dbInfo.error && <p className="text-red-400">Error: {dbInfo.error}</p>}
            </div>
          )}
        </div>

        {/* Query Interface */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Test Digital Twin</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuery()}
                placeholder="Ask about skills, experience, projects..."
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleQuery}
              disabled={loading || !question.trim()}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition"
            >
              {loading ? "Thinking..." : "Ask Question"}
            </button>
          </div>

          {/* Answer */}
          {answer && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Answer:</h3>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-200 whitespace-pre-wrap">{answer}</p>
              </div>

              {/* Sources */}
              {sources.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Sources:</h4>
                  <div className="space-y-2">
                    {sources.map((source, idx) => (
                      <div key={idx} className="bg-gray-700 px-4 py-2 rounded flex justify-between">
                        <span className="text-gray-300">{source.title}</span>
                        <span className="text-gray-400">
                          {(source.relevance * 100).toFixed(1)}% relevant
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MCP Info */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">MCP Integration</h2>
          <p className="text-gray-300 mb-4">
            This server is ready for integration with VS Code Insiders and GitHub Copilot.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">MCP Endpoint:</p>
            <code className="text-blue-400">http://localhost:3000/api/mcp</code>
          </div>
          <div className="mt-4 text-gray-300 text-sm">
            <p className="font-semibold mb-2">Configuration file created at:</p>
            <code className="text-blue-400">.vscode/mcp.json</code>
          </div>
        </div>
      </div>
    </div>
  )
}
