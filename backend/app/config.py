import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AI Workspace"
    VERSION: str = "1.0.0"
    
    # API Keys (we'll use later)
    #  NVIDIA_API_KEY: str = os.getenv("NVIDIA_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")

settings = Settings()

