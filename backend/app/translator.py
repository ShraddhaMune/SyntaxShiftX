import ollama
from .cleaner import clean_translation

MODEL = "qwen2.5-coder:latest"


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


def ask_model(prompt):

    response = ollama.generate(
        model=MODEL,
        prompt=prompt,
        stream=False,
        options={
            "temperature": 0,
            "top_p": 0.1,
        },
    )

    return clean_translation(response["response"])


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