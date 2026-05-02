import requests
from app.config import settings


class LLMClient:

    @staticmethod
    def generate_response(prompt: str, system_message: str = "You are a helpful AI assistant.") -> str:
        try:
            url = "https://openrouter.ai/api/v1/chat/completions"

            headers = {
                "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            }

            data = {
                "model": "openai/gpt-oss-120b:free",
                "messages": [
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7
            }

            response = requests.post(url, headers=headers, json=data)

            # Debug safety
            if response.status_code != 200:
                return f"Error: {response.text}"

            response_json = response.json()

            return response_json["choices"][0]["message"]["content"]

        except Exception as e:
            return f"Error: {str(e)}"