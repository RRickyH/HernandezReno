interface modalProps {
  title: string;
  message: string;
  onDismiss: () => void;
}

export default function Modal({ title, message, onDismiss }: modalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-2xl shadow-md bg-white p-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl">{title}</h1>
          <button
            className="flex items-center justify-center rounded-md bg-gray-800 aspect-square size-8 p-1.5"
            onClick={onDismiss}
          >
            <div className="relative flex items-center justify-center rounded-xl size-full">
              <span
                className={
                  "absolute bg-gray-50 rounded-full w-full h-1 transition-all top-1/2 -translate-y-1/2 left-0 rotate-45"
                }
              />
              <span
                className={
                  "absolute bg-gray-50 rounded-full w-full h-1 transition-all -rotate-45 bottom-1/2 translate-y-1/2 left-0z"
                }
              />
            </div>
          </button>
        </div>
        <p className="mb-5">{message}</p>
      </div>
    </div>
  );
}
