import { useState } from "react"
import { uploadPDF, generateSummary } from "../services/api"

export default function PdfPanel() {
  const [file, setFile] = useState(null)
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF")

    setLoading(true)

    try {
      // Step 1: Upload PDF (optional preview call)
      await uploadPDF(file)

      // Step 2: Generate Summary
      const res = await generateSummary(file, "standard")
      setSummary(res.summary)

    } catch (err) {
      console.error(err)
      alert("Error processing PDF")
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📄 PDF Summary Generator</h2>

      {/* File Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Button */}
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        {loading ? "Processing..." : "Generate Summary"}
      </button>

      {/* Output */}
      <div style={{ marginTop: "20px" }}>
        <h3>Summary:</h3>
        <p style={{ whiteSpace: "pre-line" }}>{summary}</p>
      </div>
    </div>
  )
}