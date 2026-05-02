const BASE_URL = "http://127.0.0.1:8000"

export const testAI = async () => {
  const res = await fetch(`${BASE_URL}/test-ai`)
  return res.json()
}

export const uploadPDF = async (file) => {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${BASE_URL}/upload-pdf`, {
    method: "POST",
    body: formData,
  })

  return res.json()
}

export const generateSummary = async (file, mode = "standard") => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("mode", mode)

  const res = await fetch(`${BASE_URL}/generate-summary`, {
    method: "POST",
    body: formData,
  })

  return res.json()
}

export const generateFlashcards = async (file) => {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${BASE_URL}/generate-flashcards`, {
    method: "POST",
    body: formData,
  })

  return res.json()
}

export const generateQuiz = async (file) => {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${BASE_URL}/generate-quiz`, {
    method: "POST",
    body: formData,
  })

  return res.json()
}