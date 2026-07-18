from openai import OpenAI, APIError
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

MODEL = os.getenv(
    "OPENROUTER_MODEL",
)
from .cleaner import clean_translation



def is_bad_translation(code: str, target: str) -> bool:

    text = code.lower()

    if target == "javascript":
        return (
            "system.out" in text
            or "public static" in text
            or "string[]" in text
            or "class " in text
        )

    if target == "typescript":
        return (
            "system.out" in text
            or "public static" in text
            or "string[]" in text
        )

    if target == "python":
        return (
            "system.out" in text
            or "public static" in text
            or ";" in text and "print(" not in text
        )

    if target == "c":
        return (
            "system.out" in text
            or "console.log" in text
            or "public static" in text
        )

    if target == "cpp":
        return (
            "system.out" in text
            or "console.log" in text
            or "public static" in text
        )

    return False


def build_prompt(source, target, code):

    return f"""
You are a source-to-source compiler.

Translate the following {source} program into valid {target}.

STRICT RULES

- Return ONLY executable {target} code.
- Do NOT explain.
- Do NOT use markdown.
- Do NOT use ``` blocks.
- Do NOT include language names.
- Preserve the complete logic.
- Preserve loops.
- Preserve conditions.
- Preserve variables.
- Preserve functions.
- Preserve output.
- Produce VALID {target} syntax.

If translating to JavaScript:
- Remove every Java keyword.
- Never output public/static/String/class unless required.
- Use console.log().
- Use let/const.

If translating to TypeScript:
- Produce valid executable TypeScript.
- Use let/const.
- Add proper types.

If translating to Python:
- No class wrapper.
- No main method.
- Use print().
- Use Python syntax.

If translating to C:
- Include stdio.h.
- Use printf().
- Generate int main().

If translating to C++:
- Include iostream.
- Use cout.
- Generate int main().

Program:

{code}
"""


from openai import APIError

def ask_model(prompt):
    try:
        response = client.chat.completions.create(
            model=MODEL,
            temperature=0,
            top_p=0.1,
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        print(response)

        return clean_translation(
            response.choices[0].message.content
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"ERROR: {e}"


def translate_code(source_language, target_language, code):

    prompt = build_prompt(
        source_language,
        target_language,
        code,
    )

    translated = ask_model(prompt)

    if is_bad_translation(
        translated,
        target_language.lower(),
    ):

        retry_prompt = (
            prompt
            + """

YOUR LAST OUTPUT WAS INVALID.

Translate AGAIN.

Return ONLY VALID executable code.
"""
        )

        translated = ask_model(retry_prompt)

    return translated