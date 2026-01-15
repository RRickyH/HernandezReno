interface tagButtonProps {
  tag: string;
  onClick: (tag: string) => void;
}

export default function TagButton({ tag, onClick }: tagButtonProps) {
  return (
    <button
      onClick={() => {
        onClick(tag);
      }}
      type="button"
      className="flex items-center justify-center px-4 py-2 rounded-lg bg-white outline-2 outline-gray-300 text-gray-700"
    >
      {tag}
    </button>
  );
}
