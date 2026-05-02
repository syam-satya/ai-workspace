import { useState } from "react"
import Sidebar from "../components/Sidebar"
import PdfPanel from "../components/PdfPanel"

export default function Dashboard() {
  const [view, setView] = useState("chat")

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setView={setView} />

      <div style={{ flex: 1, padding: "20px" }}>
        {view === "chat" && <h2>Chat Panel (next step)</h2>}
        {view === "pdf" && <PdfPanel />}
        {view === "summary" && <h2>Summary Panel</h2>}
        {view === "quiz" && <h2>Quiz Panel</h2>}
        {view === "flashcards" && <h2>Flashcards Panel</h2>}
      </div>
    </div>
  )
}