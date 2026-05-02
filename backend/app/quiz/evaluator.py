from app.core.llm_client import LLMClient

class QuizEvaluator:

    @staticmethod
    def evaluate(questions, user_answers):
        prompt = f"""
        You are an evaluator.
        
        Evaluate the user's answers.
        
        For each question:
        - Give score (0–10)
        - Give short feedback
        
        Format strictly:
        
        1. Score: X/10
        
        Feedback: ...
        
        Questions:
        {questions}
        
        User Answers:
        {user_answers}
        """

        return LLMClient.generate_response(prompt)