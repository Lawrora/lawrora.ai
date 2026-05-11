import os
import logging
from dataclasses import dataclass
from typing import Optional

from dotenv import load_dotenv
from google import genai
from google.genai import errors


# -------------------------------------------------
# Logging
# -------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

logger = logging.getLogger("gemini")


# -------------------------------------------------
# Config
# -------------------------------------------------

@dataclass(frozen=True)
class GeminiConfig:
    api_key: str
    model: str = "gemini-2.5-flash"


def load_gemini_config() -> GeminiConfig:
    env_path = r"E:\Sehastrajit\Project\legal-protoype\.env"
    load_dotenv(env_path)

    api_key = os.getenv("gem_api")

    if not api_key:
        raise RuntimeError("Missing gem_api in .env")

    return GeminiConfig(api_key=api_key)


# -------------------------------------------------
# Gemini Service
# -------------------------------------------------

class GeminiService:
    def __init__(self, config: Optional[GeminiConfig] = None):
        self.config = config or load_gemini_config()
        self.client = genai.Client(api_key=self.config.api_key)

    def generate_text(self, prompt: str) -> str:
        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty")

        try:
            response = self.client.models.generate_content(
                model=self.config.model,
                contents=prompt,
            )

            if not response.text:
                raise RuntimeError("Gemini returned empty response")

            return response.text.strip()

        except errors.ClientError as e:
            logger.error("Gemini client error: %s", e)
            raise

        except Exception as e:
            logger.exception("Unexpected Gemini error")
            raise RuntimeError("Gemini generation failed") from e


# -------------------------------------------------
# Simple helper function
# -------------------------------------------------

gemini_service = GeminiService()


def ask_gemini(prompt: str) -> str:
    return gemini_service.generate_text(prompt)


# -------------------------------------------------
# Local test
# -------------------------------------------------

if __name__ == "__main__":
    result = ask_gemini("Say hello")
    print(result)