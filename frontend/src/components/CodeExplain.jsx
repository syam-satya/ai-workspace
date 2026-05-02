import { useState } from "react"

function CodeExplain({ setSessionData }) {
  const [code, setCode] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleExplain = async () => {
    if (!code.trim()) return

    setLoading(true)

    const formData = new URLSearchParams()
    formData.append("message", "Explain this code:\n" + code)

    const res = await fetch("http://127.0.0.1:8000/code-chat", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    })

    const data = await res.json()

    setResponse(data.response)

    setSessionData((prev) => ({
      ...prev,
      code: data.response,
    }))

    setLoading(false)
  }

  return (
    <div className="space-y-3">

      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-40 p-3 rounded-xl bg-[#020617] border border-slate-700"
      />

      <button
        onClick={handleExplain}
        className="bg-emerald-500 px-4 py-2 rounded-xl"
      >
        Explain Code
      </button>

      {loading && <p className="text-slate-400">Thinking...</p>}

      <div className="bg-[#1f2937] p-3 rounded-xl whitespace-pre-wrap">
        {response}
      </div>

    </div>
  )
}

export default CodeExplain