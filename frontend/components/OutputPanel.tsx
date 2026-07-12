interface Props {
  title: string;
  children: React.ReactNode;
}

export default function OutputPanel({
  title,
  children,
}: Props) {

  const isExecution = title === "Execution Output";

  return (

    <div className="h-[220px] rounded-2xl border border-cyan-500/20 bg-[#101828] shadow-lg shadow-cyan-500/5 flex flex-col overflow-hidden">

      <div className="flex items-center justify-between border-b border-cyan-500/10 px-5 py-3">

        <div className="flex items-center gap-3">

          <div
            className={`h-3 w-3 rounded-full ${
              isExecution
                ? "bg-green-400"
                : "bg-cyan-400"
            }`}
          />

          <h2 className="font-bold text-lg">
            {title}
          </h2>

        </div>

        <span className="text-xs text-gray-500">

          {isExecution ? "Terminal" : "SyntaxShift AI"}

        </span>

      </div>

      <div
        className={`flex-1 overflow-auto p-5 whitespace-pre-wrap text-[15px] leading-7 ${
          isExecution
            ? "bg-[#050505] text-green-400 font-mono"
            : "bg-[#0B1220] text-gray-300"
        }`}
      >

        {children ? (
          children
        ) : (
          <span className="text-gray-500">
            Nothing to display.
          </span>
        )}

      </div>

    </div>

  );

}