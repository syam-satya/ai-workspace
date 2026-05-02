from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware

from app.pdf_notes.pdf_service import extract_text
from app.pdf_notes.summarizer import Summarizer
from app.pdf_notes.flashcards import FlashcardGenerator
from app.pdf_notes.quiz_generator import QuizGenerator

from app.utils.session_manager import SessionManager, SESSION_STORE
from app.code_assistant.chat_service import ChatService

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- SESSION MIDDLEWARE ----------
@app.middleware("http")
async def session_middleware(request: Request, call_next):

    session_id = request.cookies.get("session_id")

    if not session_id or session_id not in SESSION_STORE:
        session_id = SessionManager.create_session()
        response = await call_next(request)
        response.set_cookie(key="session_id", value=session_id)
        return response

    return await call_next(request)


# ---------- CHAT ----------
@app.post("/code-chat")
async def code_chat(request: Request, message: str = Form(...)):
    session_id = request.cookies.get("session_id")
    response = ChatService.chat(session_id, message)
    return {"response": response}


# ---------- SUMMARY ----------
@app.post("/generate-summary")
async def generate_summary(request: Request, file: UploadFile = File(...)):
    session_id = request.cookies.get("session_id")

    text = extract_text(file.file)
    summary = Summarizer.summarize(text)

    SessionManager.set_summary(session_id, summary)

    return {"summary": summary}


# ---------- FLASHCARDS ----------
@app.post("/generate-flashcards")
async def generate_flashcards(request: Request, file: UploadFile = File(...)):
    session_id = request.cookies.get("session_id")

    text = extract_text(file.file)
    flashcards = FlashcardGenerator.generate_flashcards(text)

    SessionManager.set_flashcards(session_id, flashcards)

    return {"flashcards": flashcards}


# ---------- QUIZ ----------
@app.post("/generate-quiz")
async def generate_quiz(request: Request, file: UploadFile = File(...)):
    session_id = request.cookies.get("session_id")

    text = extract_text(file.file)
    quiz = QuizGenerator.generate_quiz(text)

    SessionManager.set_quiz(session_id, quiz)

    return {"quiz": quiz}


# ---------- DEBUG ----------
@app.get("/debug-session")
def debug_session(request: Request):
    session_id = request.cookies.get("session_id")
    return SessionManager.get_session(session_id)