import { useState } from "react"
import Chat from "./components/Chat"

function App() {
  const [sessionFile, setSessionFile] = useState(null)

  return (
    <div className="flex h-screen bg-[#0b0f19] text-white">

      {/* -------- LEFT PANEL (UPLOAD ONLY) -------- */}
      <div className="w-72 bg-[#111827] p-4 border-r border-slate-800 flex flex-col">

        <h2 className="text-lg font-semibold mb-4 text-emerald-400">
          Sources
        </h2>

        {/* DRAG & DROP */}
        <div
          className="border-2 border-dashed border-slate-600 p-6 rounded-2xl text-center cursor-pointer bg-[#020617] hover:scale-105 transition"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            setSessionFile(file)
          }}
        >
          {sessionFile ? (
            <p className="text-green-400">{sessionFile.name}</p>
          ) : (
            <p className="text-slate-400">
              Drag & Drop PDF here
            </p>
          )}
        </div>

        {/* FILE BUTTON */}
        <label className="mt-4 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-center py-2 rounded-xl">
          Upload File
          <input
            type="file"
            className="hidden"
            onChange={(e) => setSessionFile(e.target.files[0])}
          />
        </label>

      </div>

      {/* -------- CENTER (CHAT + ALL OUTPUTS) -------- */}
      <div className="flex-1">
        <Chat sessionFile={sessionFile} />
      </div>

    </div>
  )
}

export default App