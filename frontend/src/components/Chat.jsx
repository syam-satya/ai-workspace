import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function Chat({ sessionFile }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [codeInput, setCodeInput] = useState("")

  // -------- SAFE RESPONSE PARSER --------
  const getContent = (data) => {
    return (
      data.response ||
      data.summary ||
      data.flashcards ||
      data.quiz ||
      data.explanation ||
      data.detail ||
      "⚠️ Empty response from server"
    )
  }

  // -------- CHAT --------
  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")

    // loading
    setMessages(prev => [...prev, { role: "assistant", content: "⏳ Thinking..." }])

    try {
      const formData = new URLSearchParams()
      formData.append("message", input)

      const res = await fetch("http://127.0.0.1:8000/code-chat", {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const data = await res.json()
      console.log("CHAT RESPONSE:", data)

      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "assistant", content: getContent(data) }
      ])

    } catch (err) {
      console.error(err)
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "❌ Chat API failed" }
      ])
    }
  }

  // -------- PDF API --------
  const callAPI = async (endpoint) => {
    if (!sessionFile) {
      alert("Upload PDF first")
      return
    }

    setMessages(prev => [...prev, { role: "assistant", content: "⏳ Processing..." }])

    try {
      const formData = new FormData()
      formData.append("file", sessionFile)

      const res = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const data = await res.json()
      console.log(endpoint, data)

      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "assistant", content: getContent(data) }
      ])

    } catch (err) {
      console.error(err)
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "assistant", content: `❌ ${endpoint} failed` }
      ])
    }
  }

  // -------- CODE EXPLAIN --------
  const handleCodeExplain = async () => {
    if (!codeInput.trim()) {
      alert("Paste code first")
      return
    }

    setMessages(prev => [
      ...prev,
      { role: "user", content: codeInput },
      { role: "assistant", content: "⏳ Explaining code..." }
    ])

    try {
      const formData = new URLSearchParams()
      formData.append("message", `Explain this code:\n${codeInput}`)

      const res = await fetch("http://127.0.0.1:8000/code-chat", {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const data = await res.json()
      console.log("CODE:", data)

      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "assistant", content: getContent(data) }
      ])

      setCodeInput("")

    } catch (err) {
      console.error(err)
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "❌ Code explain failed" }
      ])
    }
  }

  return (
    <div className="flex h-full">

      {/* -------- CHAT -------- */}
      <div className="flex-1 flex flex-col">

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.length === 0 && (
            <p className="text-slate-400 text-center mt-20">
              Start chatting or use tools →
            </p>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl max-w-[70%] ${
                msg.role === "user"
                  ? "bg-emerald-500 ml-auto"
                  : "bg-[#1f2937]"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}

        </div>

        {/* INPUT */}
        <div className="flex gap-2 p-4 border-t border-slate-700">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-black border border-slate-600"
            placeholder="Ask something..."
          />

          <button
            onClick={handleSend}
            className="bg-emerald-500 px-5 rounded-xl"
          >
            Send
          </button>
        </div>

      </div>

      {/* -------- RIGHT PANEL -------- */}
      <div className="w-72 bg-[#111827] p-4 border-l border-slate-800 flex flex-col gap-3">

        <h2 className="text-lg font-semibold text-emerald-400">
          Studio
        </h2>

        <button onClick={() => callAPI("generate-summary")} className="bg-blue-500 p-3 rounded-xl">
          Summary
        </button>

        <button onClick={() => callAPI("generate-flashcards")} className="bg-purple-500 p-3 rounded-xl">
          Flashcards
        </button>

        <button onClick={() => callAPI("generate-quiz")} className="bg-orange-500 p-3 rounded-xl">
          Quiz
        </button>

        {/* CODE BOX */}
        <div className="mt-4">
          <textarea
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Paste code here..."
            className="w-full h-32 p-2 rounded bg-black border border-slate-600"
          />

          <button
            onClick={handleCodeExplain}
            className="mt-2 w-full bg-green-500 p-2 rounded-xl"
          >
            Explain Code
          </button>
        </div>

      </div>
    </div>
  )
}

export default Chat