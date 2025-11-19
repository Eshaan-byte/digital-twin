"use client"

import { useState } from "react"
import { queryDigitalTwin, getDatabaseInfo } from "./actions/digital-twin"

export default function Home() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<Array<{ title: string; relevance: number }>>([])
  const [loading, setLoading] = useState(false)

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

  const sampleQuestions = [
    "What are your Python skills?",
    "Tell me about your RAG project",
    "What is your experience with AI/ML?",
    "Describe a challenging project you've worked on"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Eshaan Gupta
          </h1>
          <div className="flex gap-4">
            <a href="https://github.com/Eshaan-byte" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/eshaangupta57128/" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
              LinkedIn
            </a>
            <a href="mailto:eshaanverse1@gmail.com"
               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Email
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Hi, I'm Eshaan Gupta
        </h2>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4">
          Software & AI/ML Developer | Building Intelligent Systems
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          IT Student at Victoria University (Graduating 2026) with hands-on experience in software development,
          AI-driven applications, and web technologies. Skilled in Python, React, and machine learning frameworks.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#chat" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105">
            💬 Chat with My AI Twin
          </a>
          <a href="https://github.com/Eshaan-byte/digital-twin" target="_blank" rel="noopener noreferrer"
             className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:shadow-lg transition">
            📚 View Source Code
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Projects Built", value: "10+", icon: "🚀" },
            { label: "Technologies", value: "15+", icon: "⚡" },
            { label: "Graduating", value: "2026", icon: "🎓" },
            { label: "Location", value: "Sydney", icon: "📍" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition transform hover:scale-105">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">About Me</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "🎯 Focus Areas", desc: "Web Development, Machine Learning, Blockchain, Generative AI" },
            { title: "💡 Strengths", desc: "Communication, Problem-Solving, Teamwork, Creative Thinking" },
            { title: "🌍 Experience", desc: "Full-stack development, AI applications, Smart contracts, Agile workflows" },
            { title: "📈 Education", desc: "Victoria University IT Student (2026) | Building efficient and scalable solutions" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Projects */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">Key Projects</h3>
        <div className="space-y-6">
          {/* ChatPDF Project */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
              📄 ChatPDF: AI Document Q&A
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Developed an AI-powered document Q&A application that enables users to query PDF content
              using GPT-4 and Streamlit. Users can upload documents and get instant, context-aware answers.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Python", "GPT-4", "Streamlit", "LangChain", "PDF Processing", "NLP"].map(tech => (
                <span key={tech} className="px-3 py-1 bg-white dark:bg-gray-600 rounded-full text-sm font-medium text-blue-600 dark:text-blue-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              🤖 GPT-4 Integration • 📚 Document Intelligence • ⚡ Real-time Q&A
            </div>
          </div>

          {/* Movie Recommendation Project */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-bold mb-3 text-purple-600 dark:text-purple-400">
              🎬 Movie Recommendation System
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Built a sophisticated recommendation engine using collaborative filtering and content-based methods
              with Scikit-Learn. Provides personalized movie suggestions based on user preferences and viewing history.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Python", "Scikit-Learn", "Pandas", "NumPy", "Machine Learning", "Collaborative Filtering"].map(tech => (
                <span key={tech} className="px-3 py-1 bg-white dark:bg-gray-600 rounded-full text-sm font-medium text-purple-600 dark:text-purple-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              🎯 Personalized Recommendations • 📊 ML Algorithms • 🔍 Content-Based Filtering
            </div>
          </div>

          {/* Netflix Clone Project */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-bold mb-3 text-red-600 dark:text-red-400">
              🎥 Netflix Clone
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Created a fully functional Netflix clone using React.js with TMDB API integration.
              Features dynamic routing, reusable components, and a responsive UI that mirrors Netflix's design.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["React.js", "JavaScript", "TMDB API", "CSS", "React Router", "Responsive Design"].map(tech => (
                <span key={tech} className="px-3 py-1 bg-white dark:bg-gray-600 rounded-full text-sm font-medium text-red-600 dark:text-red-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              🎨 Modern UI/UX • 🔄 Dynamic Content • 📱 Fully Responsive
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">Technical Skills</h3>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "Languages", skills: ["Python", "JavaScript", "SQL", "HTML", "CSS", "Rust", "Solidity"] },
              { category: "Frameworks", skills: ["React.js", "Node.js", "Express.js", "Streamlit"] },
              { category: "AI/ML Tools", skills: ["Scikit-Learn", "Pandas", "NumPy", "OpenCV", "GPT-4", "LangChain"] },
              { category: "Databases", skills: ["MongoDB", "SQL Databases"] },
              { category: "Tools & Platforms", skills: ["Git", "Tableau", "TMDB API", "Blockchain"] },
              { category: "Soft Skills", skills: ["Communication", "Problem-Solving", "Teamwork", "Time Management", "Leadership", "Creative Thinking"] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">{section.category}</h4>
                <ul className="space-y-2">
                  {section.skills.map((skill, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300 flex items-center">
                      <span className="text-green-500 mr-2">✓</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="chat" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-4 text-center">💬 Chat with My AI Twin</h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Ask me anything about my experience, skills, projects, or career goals.
          Powered by RAG technology and Groq LLM for accurate, context-aware responses.
        </p>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
          {/* Sample Questions */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Try asking:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuestion(q)}
                  className="text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition"
                >
                  💡 {q}
                </button>
              ))}
            </div>
          </div>

          {/* Query Input */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuery()}
                placeholder="Ask about my experience, skills, projects..."
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleQuery}
              disabled={loading || !question.trim()}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition transform hover:scale-105 disabled:transform-none shadow-lg"
            >
              {loading ? "🤔 Thinking..." : "🚀 Ask Question"}
            </button>
          </div>

          {/* Answer Display */}
          {answer && (
            <div className="mt-8 space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
                  <span className="text-2xl mr-2">🤖</span> Answer:
                </h4>
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">{answer}</p>
              </div>

              {/* Sources */}
              {sources.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">📚 Sources:</h4>
                  <div className="grid gap-3">
                    {sources.map((source, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-5 py-3 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{source.title}</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {(source.relevance * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Integration Tools */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">🔧 Integration Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "💻", title: "VS Code Extension", desc: "Integrate with GitHub Copilot via MCP protocol", link: "https://code.visualstudio.com" },
            { icon: "🧠", title: "Claude Desktop", desc: "Add to Claude Desktop as MCP server", link: "https://claude.ai" },
            { icon: "🌐", title: "API Access", desc: "Direct API access via REST endpoint", link: "/api/mcp" }
          ].map((tool, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <div className="text-5xl mb-4">{tool.icon}</div>
              <h4 className="text-xl font-bold mb-2">{tool.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.desc}</p>
              <a href={tool.link} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Eshaan Gupta
              </h4>
              <p className="text-gray-400">
                Software & AI/ML Developer
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-gray-400">
                <p>📧 eshaanverse1@gmail.com</p>
                <p>📞 0430 617 523</p>
                <p>📍 Sydney, Australia (Chippendale)</p>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Links</h5>
              <div className="space-y-2">
                <a href="https://github.com/Eshaan-byte" className="block text-gray-400 hover:text-blue-400 transition">GitHub</a>
                <a href="https://www.linkedin.com/in/eshaangupta57128/" className="block text-gray-400 hover:text-blue-400 transition">LinkedIn</a>
                <a href="https://portfolio-eshaanverse.netlify.app/projects" className="block text-gray-400 hover:text-blue-400 transition">Portfolio</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Eshaan Gupta. Built with Next.js 15 & powered by AI.</p>
            <p className="mt-2 text-sm">🤖 Digital Twin MCP Server | Victoria University IT Student</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
