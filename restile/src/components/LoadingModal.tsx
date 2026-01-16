export default function LoadingModal() {
  return (
    <div className="fixed flex inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-32">
      <img
        src="/Hernandez_renovations_logo_white.svg"
        alt="HR logo"
        className="animate-[spin_0.5s_linear_infinite] aspect-square max-w-96"
      />
    </div>
  );
}
