from app.utils.session_manager import SessionManager
from app.core.llm_client import LLMClient

class ChatService:

    @staticmethod
    def chat(session_id, message):
        SessionManager.add_message(session_id, "user", message)

        response = LLMClient.generate_response(message)

        SessionManager.add_message(session_id, "assistant", response)

        return response