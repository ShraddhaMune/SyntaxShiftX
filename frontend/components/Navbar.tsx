export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#070b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            <span className="text-white">SyntaxShift</span>{" "}
            <span className="text-cyan-400">X</span>
          </h1>

          <p className="text-xs md:text-sm text-gray-400">
            AI-Powered Programming Language Translator
          </p>
        </div>

        {/* GitHub Button */}
        <a
          href="https://github.com/ShraddhaMune/SyntaxShiftX"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden sm:flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-500
            transition-all
            duration-300
            hover:scale-105
            font-semibold
          "
        >
          ⭐ GitHub
        </a>

      </div>
    </nav>
  );
}