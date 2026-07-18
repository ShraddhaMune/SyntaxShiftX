from pathlib import Path
import subprocess
import shutil

TEMP_DIR = Path("temp")
TEMP_DIR.mkdir(exist_ok=True)


def execute(command, program_input=""):

    print("RUNNING:", command)

    result = subprocess.run(
        command,
        input=program_input,
        capture_output=True,
        text=True,
        timeout=10,
    )

    print("RETURN CODE:", result.returncode)
    print("STDOUT:", result.stdout)
    print("STDERR:", result.stderr)

    if result.returncode == 0:
        return result.stdout.strip() or "Program executed successfully."

    return result.stderr.strip()

    
# ---------------- PYTHON ---------------- #

def run_python(code: str, program_input=""):

    file = TEMP_DIR / "program.py"

    file.write_text(code, encoding="utf-8")

    return execute(
        [
            "python",
            str(file.resolve())
        ],
        program_input,
    )


# ---------------- JAVASCRIPT ---------------- #

def run_javascript(code: str, program_input=""):

    file = TEMP_DIR / "program.js"

    file.write_text(code, encoding="utf-8")

    return execute(
    [
        "node",
        str(file.resolve())
    ],
    program_input,
)


# ---------------- TYPESCRIPT ---------------- #

def run_typescript(code: str, program_input=""):

    ts_file = TEMP_DIR / "program.ts"
    js_file = TEMP_DIR / "program.js"

    ts_file.write_text(code, encoding="utf-8")

    tsc = shutil.which("tsc")
    node = shutil.which("node")

    if tsc is None:
        return "TypeScript compiler (tsc) not found."

    if node is None:
        return "Node.js not found."

    compile_result = subprocess.run(
        [
            tsc,
            str(ts_file.resolve()),
            "--outDir",
            str(TEMP_DIR.resolve()),
        ],
        capture_output=True,
        text=True,
        timeout=10,
        shell=True,
    )

    if compile_result.returncode != 0:
        return compile_result.stderr.strip() or compile_result.stdout.strip()

    return execute(
    [
        node,
        str(js_file.resolve()),
    ],
    program_input,
)

# ---------------- C ---------------- #

def run_c(code: str, program_input=""):

    c_file = TEMP_DIR / "program.c"
    exe_file = TEMP_DIR / "program.exe"

    c_file.write_text(code, encoding="utf-8")

    compile_result = subprocess.run(
        [
            "gcc",
            str(c_file.resolve()),
            "-o",
            str(exe_file.resolve()),
        ],
        capture_output=True,
        text=True,
        timeout=10,
    )

    if compile_result.returncode != 0:
        return compile_result.stderr.strip()

    return execute(
    [
        str(exe_file.resolve())
    ],
    program_input,
)


# ---------------- C++ ---------------- #

def run_cpp(code: str, program_input=""):

    cpp_file = TEMP_DIR / "program.cpp"
    exe_file = TEMP_DIR / "program.exe"

    cpp_file.write_text(code, encoding="utf-8")

    compile_result = subprocess.run(
        [
            "g++",
            str(cpp_file.resolve()),
            "-o",
            str(exe_file.resolve()),
        ],
        capture_output=True,
        text=True,
        timeout=10,
    )

    if compile_result.returncode != 0:
        return compile_result.stderr.strip()

    return execute(
    [
        str(exe_file.resolve())
    ],
    program_input,
)


# ---------------- JAVA ---------------- #

def run_java(code: str, program_input=""):

    java_file = TEMP_DIR / "Main.java"

    java_file.write_text(code, encoding="utf-8")

    compile_result = subprocess.run(
        [
            "javac",
            str(java_file.resolve())
        ],
        capture_output=True,
        text=True,
        timeout=10,
    )

    if compile_result.returncode != 0:
        return compile_result.stderr.strip()

    return execute(
    [
        "java",
        "-cp",
        str(TEMP_DIR.resolve()),
        "Main",
    ],
    program_input,
)


# ---------------- EXECUTOR ---------------- #

def execute_code(language: str, code: str, program_input=""):

    language = language.lower()

    try:

        if language == "python":
            return run_python(code, program_input)

        elif language == "javascript":
            return run_javascript(code, program_input)

        elif language == "typescript":
            return run_typescript(code, program_input)

        elif language == "c":
            return run_c(code, program_input)

        elif language == "cpp":
            return run_cpp(code, program_input)

        elif language == "java":
            return run_java(code, program_input)

        return "Execution not supported."

    except subprocess.TimeoutExpired:
        return "Execution timed out."

    except Exception as e:
        return str(e)