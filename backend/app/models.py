from pydantic import BaseModel


class TranslateRequest(BaseModel):
    source_language: str
    target_language: str
    code: str
    program_input: str = ""


class TranslateResponse(BaseModel):
    translated_code: str
    execution_output: str
    explanation: str