from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import (
    TranslateRequest,
    TranslateResponse,
)

from .translator import translate_code
from .executor import execute_code
from .explainer import generate_explanation


app = FastAPI(
    title="SyntaxShift X",
    version="2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "status": "running",
        "project": "SyntaxShift X",
    }


@app.post(
    "/translate",
    response_model=TranslateResponse,
)
def translate(request: TranslateRequest):

    translated = translate_code(
        request.source_language,
        request.target_language,
        request.code,
    )

    execution = execute_code(
    request.target_language,
    translated,
    request.program_input,
)

    explanation = generate_explanation(
        request.source_language,
        request.target_language,
    )

    return TranslateResponse(
        translated_code=translated,
        execution_output=execution,
        explanation=explanation,
    )