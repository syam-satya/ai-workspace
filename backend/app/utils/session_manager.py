SESSION_STORE = {}

class SessionManager:

    @staticmethod
    def create_session():
        import uuid
        session_id = str(uuid.uuid4())

        SESSION_STORE[session_id] = {
            "chat": [],
            "flashcards": "",
            "quiz": "",
            "summary": "",
            "code": ""
        }

        return session_id

    @staticmethod
    def get_session(session_id):
        return SESSION_STORE.get(session_id, {})

    @staticmethod
    def add_message(session_id, role, content):
        if session_id in SESSION_STORE:
            SESSION_STORE[session_id]["chat"].append({
                "role": role,
                "content": content
            })

    @staticmethod
    def set_flashcards(session_id, data):
        if session_id in SESSION_STORE:
            SESSION_STORE[session_id]["flashcards"] = data

    @staticmethod
    def set_quiz(session_id, data):
        if session_id in SESSION_STORE:
            SESSION_STORE[session_id]["quiz"] = data

    @staticmethod
    def set_summary(session_id, data):
        if session_id in SESSION_STORE:
            SESSION_STORE[session_id]["summary"] = data