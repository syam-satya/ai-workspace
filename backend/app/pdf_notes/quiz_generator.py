from app.core.llm_client import LLMClient

from app.pdf_notes.summarizer import Summarizer

class QuizGenerator:

    @staticmethod

    def generate_quiz(text: str):

        #step-1 - split text

        chunks = Summarizer.split_text(text,chunk_size = 1000)

        MAX_CHUNKS = 8
        chunks = chunks[:MAX_CHUNKS]
        
        all_questions = []

        for chunk in chunks:

            #step-2 - extract topics

            topic_prompt = f"""Extract 3-5 key topics from the following text. REturn it as simple as possible.
            
            Text:
            {chunk}
            """
            
            topics = LLMClient.generate_response(topic_prompt)

            #step-3 - generate questions from topics

            question_prompt = f"""

            Generate 5 high-quality quiz questions based on the following topics.
            
            Rules:
            - Questions must test understanding
            - Avoid repetition
            - Mix conceptual and definition-based
            - Keep questions clear and concise
            - Do NOT include answers
            
            - Format as:
            1. ...
            2. ...
            3. ...
            
            Topics:
            {topics}

            """

            questions  = LLMClient.generate_response(question_prompt)

            all_questions.append(questions)

        #step-4 - combine

        combined = "\n".join(all_questions)

        #step-5 - final cleanup +  deduplicating

        final_prompt = f"""
        Refine the following quiz questions.
        
        Rules:
        - Remove duplicate questions
        - Keep questions SHORT and clear (1 line each)
        - Avoid overly complex or multi-part questions
        - Ensure proper numbering (1, 2, 3...)
        - Do NOT include headings or titles
        - Do NOT include answers
        - Cover all important topics evenly
        
        Quiz:
        {combined}


"""


        final_oytput = LLMClient.generate_response(final_prompt)

        return final_oytput