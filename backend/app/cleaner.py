import re


def clean_translation(text: str) -> str:

    if not text:
        return ""

    text = text.strip()

    # Remove markdown fences
    text = re.sub(r"```[a-zA-Z0-9+#-]*", "", text)
    text = text.replace("```", "")

    # Remove accidental language labels
    language_labels = [
        "python",
        "java",
        "javascript",
        "typescript",
        "c",
        "cpp",
        "c++",
        "c#",
        "csharp",
    ]

    lines = text.splitlines()

    if lines:
        first = lines[0].strip().lower()

        if first in language_labels:
            lines = lines[1:]

    text = "\n".join(lines)

    # Remove common AI chatter
    forbidden = [
        "Here is",
        "Here's",
        "Explanation",
        "The translated",
        "This code",
        "This program",
        "I hope",
        "Let me know",
        "Translation:",
        "Output:",
        "Result:",
        "Sure!",
        "Certainly",
        "Of course",
        "Below is",
    ]

    cleaned = []

    for line in text.splitlines():

        if any(word.lower() in line.lower() for word in forbidden):
            break

        cleaned.append(line.rstrip())

    text = "\n".join(cleaned)

    # Remove excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def clean_explanation(text: str):

    if not text:
        return ""

    text = text.replace("•", "✓")
    text = text.strip()

    lines = []

    for line in text.splitlines():

        line = line.strip()

        if not line:
            continue

        if len(line) < 3:
            continue

        if not line.startswith("✓"):
            line = "✓ " + line.lstrip("- ")

        lines.append(line)

    return "\n".join(lines)