import { useState } from "react"

function Flashcards({ sessionFile, sessionData, setSessionData }) {
  const [cards, setCards] = useState([])

  const generate = async () => {
    if (!sessionFile) return alert("Upload PDF first")

    const formData = new FormData()
    formData.append("file", sessionFile)

    const res = await fetch("http://127.0.0.1:8000/generate-flashcards", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    const parsed = data.flashcards.split("\n\n").map((block) => {
      const q = block.match(/Q:\s*(.*)/)
      const a = block.match(/A:\s*(.*)/)
      return {
        question: q ? q[1] : "",
        answer: a ? a[1] : "",
      }
    })

    setCards(parsed)

    setSessionData((prev) => ({
      ...prev,
      flashcards: data.flashcards,
    }))
  }

  return (
    <div className="space-y-3">

      <button
        onClick={generate}
        className="bg-emerald-500 px-4 py-2 rounded-xl"
      >
        Generate Flashcards
      </button>
      

      <div className="grid grid-cols-1 gap-3">

        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-[#1f2937] p-3 rounded-xl border border-slate-700"
          >
            <p className="text-emerald-400 font-semibold">
              {c.question}
            </p>
            <p className="text-slate-300 mt-2">
              {c.answer}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Flashcards