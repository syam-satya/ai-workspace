import { useState } from "react"

function Quiz({ sessionFile, sessionData, setSessionData }) {
  const [quiz, setQuiz] = useState("")

  const generate = async () => {
    if (!sessionFile) return alert("Upload PDF first")

    const formData = new FormData()
    formData.append("file", sessionFile)

    const res = await fetch("http://127.0.0.1:8000/generate-quiz", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    setQuiz(data.quiz)

    setSessionData((prev) => ({
      ...prev,
      quiz: data.quiz,
    }))
  }

  return (
    <div className="space-y-3">

      <button
        onClick={generate}
        className="bg-emerald-500 px-4 py-2 rounded-xl"
      >
        Generate Quiz
      </button>

      <div className="bg-[#1f2937] p-3 rounded-xl whitespace-pre-wrap">
        {quiz}
      </div>
    </div>
  )
}

export default Quiz