from app.core.llm_client import LLMClient

from app.pdf_notes.summarizer import Summarizer

class FlashcardGenerator:

    @staticmethod

    def generate_flashcards(text:str):

        chunks = Summarizer.split_text(text, chunk_size = 1000)

        if not text:
            return "No content found in PDF"

        #limit chunk

        MAX_CHUNKS  = 10
        chunks = chunks[:MAX_CHUNKS]

        flashcards = []

        for chunk in chunks:
            prompt = f"""
            
            Generate 5 high-quality flashcards (Q/A format) from the following text.
            Rules:
            - Questions must be clear and meaningful
            - Answers must be concise
            - Avoid repetition
            - Cover different concepts
            - Format strictly as:
            Q: ...
            A: ...
            
            Text:
            {chunk}

            """

            response = LLMClient.generate_response(prompt)
            flashcards.append(response)

        #combine all
        combined_flashcards = "\n\n".join(flashcards)

        #second pass to clean up and format

        final_prompt = f"""

        Refine the following flashcards.
        
        Rules:
        - Remove duplicate questions
        - Keep answers concise (1–2 lines)
        - Ensure strict format:
        Q: ...
        A: ...
        - Do NOT include headings or titles
        - Do NOT repeat topics unnecessarily
        - Ensure full coverage of concepts
        
        Flashcards:
        {combined_flashcards}

        """

        final_output = LLMClient.generate_response(final_prompt)

        return final_output