from app.core.llm_client import LLMClient

class Summarizer:
    @staticmethod

    def split_text(text: str, chunk_size: int = 1000):
        chunks=  []

        for i in range(0,len(text), chunk_size):
            chunks.append(text[i:i + chunk_size])
        return chunks
    
    @staticmethod
    def summarize(text: str, mode: str = "standard") -> str:

        if mode == "consize":
            instruction = "Summarize the following text in a very short and clear way."
        
        elif mode == "detailed":
            instructtion = "Provide a detailed explanation of the following text with key concepts." 

        else:
            instruction = "Summarize the following text clearly."

        
        chunks = Summarizer.split_text(text)
        summaries = []

        for chunk in chunks:
            prompt = f"{instruction}\n\n{chunk}"
            response = LLMClient.generate_response(prompt)
            summaries.append(response)

        # Combine 1st phse summaries 

        partial_summary = "\n\n".join(summaries)

        # second pass

        final_prompt = f"""

        Combine the following summaries into a single clean summary.
        Rules:
        - Avoid repetition
        - Keep it concise and readable
        - Use bullet points where needed
        - Do NOT expand beyond given content
        - Do NOT add extra explanations

Content:
        
        {partial_summary}

        """

        final_summary = LLMClient.generate_response(final_prompt)


        return final_summary