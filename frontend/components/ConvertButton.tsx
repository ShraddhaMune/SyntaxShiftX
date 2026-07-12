interface Props {
  onClick: () => void;
  loading: boolean;
}

export default function ConvertButton({
  onClick,
  loading,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        px-8 py-3
        rounded-xl
        font-bold
        text-white
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        hover:from-cyan-400
        hover:to-blue-500
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-lg
        hover:shadow-cyan-500/40
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    >
      {loading ? "⚡ Translating..." : "⚡ Translate Code"}
    </button>
  );
}