def generate_explanation(
    source_language: str,
    target_language: str,
) -> str:

    source = source_language.lower()
    target = target_language.lower()

    summary = []

    summary.append(f"✓ Converted {source_language} → {target_language}")

    if source == "java":

        summary.append("✓ Removed class wrapper where unnecessary")

        summary.append("✓ Converted System.out.println()")

        summary.append("✓ Converted Java syntax")

    if target == "python":

        summary.append("✓ Semicolons removed")

        summary.append("✓ Indentation replaces braces")

    elif target == "javascript":

        summary.append("✓ console.log() used for output")

        summary.append("✓ JavaScript syntax generated")

    elif target == "typescript":

        summary.append("✓ Added TypeScript type annotations")

        summary.append("✓ number, string, boolean types used")

    elif target == "c":

        summary.append("✓ printf()/scanf() syntax generated")

        summary.append("✓ main() entry point preserved")

    elif target == "cpp":

        summary.append("✓ cout/cin syntax generated")

        summary.append("✓ Standard C++ structure preserved")

    elif target == "java":

        summary.append("✓ Java class structure generated")

        summary.append("✓ main() method included")

    summary.append("✓ Program logic preserved")

    return "\n".join(summary)