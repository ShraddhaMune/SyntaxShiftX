export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/15 bg-[#050816]/95 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-black tracking-wide bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            SyntaxShift X
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            AI Powered Programming Language Translator
          </p>

        </div>

        <div className="hidden lg:flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-green-300">
              Backend Online
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-semibold text-cyan-300">
              Ollama
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400"></span>
            <span className="text-xs font-semibold text-blue-300">
              qwen2.5-coder
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-400"></span>
            <span className="text-xs font-semibold text-purple-300">
              Local Execution
            </span>
          </div>

        </div>

      </div>

    </header>
  );
}
<section className="max-w-7xl mx-auto px-6 pt-6">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <div className="rounded-xl border border-cyan-500/20 bg-[#101828] p-4 hover:scale-105 transition">
      <p className="text-cyan-400 text-2xl font-bold">6+</p>
      <p className="text-gray-400">Languages</p>
    </div>

    <div className="rounded-xl border border-cyan-500/20 bg-[#101828] p-4 hover:scale-105 transition">
      <p className="text-cyan-400 text-2xl font-bold">AI</p>
      <p className="text-gray-400">Powered</p>
    </div>

    <div className="rounded-xl border border-cyan-500/20 bg-[#101828] p-4 hover:scale-105 transition">
      <p className="text-cyan-400 text-2xl font-bold">100%</p>
      <p className="text-gray-400">Local</p>
    </div>

    <div className="rounded-xl border border-cyan-500/20 bg-[#101828] p-4 hover:scale-105 transition">
      <p className="text-cyan-400 text-2xl font-bold">⚡</p>
      <p className="text-gray-400">Fast Translation</p>
    </div>

  </div>
</section>