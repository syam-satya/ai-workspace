export default function Sidebar({ setView }) {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      borderRight: "1px solid #ddd",
      padding: "20px"
    }}>
      <h2>AI Workspace</h2>

      <button onClick={() => setView("chat")}>Chat</button>
      <button onClick={() => setView("pdf")}>PDF Upload</button>
      <button onClick={() => setView("summary")}>Summary</button>
      <button onClick={() => setView("quiz")}>Quiz</button>
      <button onClick={() => setView("flashcards")}>Flashcards</button>
    </div>
  )
}