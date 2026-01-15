import { useState } from "react";
import Modal from "src/components/Modal";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProjectListItem({
  name,
  onDelete,
}: {
  name: string;
  onDelete: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  async function handleDelete(name: string) {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/tags/${name}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      await onDelete();
    } catch (error) {
      setDeleteError(true);
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-row h-16 gap-2 w-full items-center py-2">
      <span className="min-w-8 text-start grow">{name}</span>

      {/* Delete Button */}
      <button
        className="flex flex-shrink-0 relative items-center justify-center size-10 rounded-md transition-all hover:bg-red-800"
        onClick={() => {
          handleDelete(name);
        }}
      >
        {isDeleting ? (
          <div className="absolute aspect-square size-6 rounded-full bg-none border-4 border-t-transparent border-r-transparent border-gray-300 animate-[spin_0.5s_linear_infinite]" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="size-6 stroke-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        )}
      </button>
      {deleteError ? (
        <Modal
          title="Delete Tag Failed!"
          message="Unable to delete the tag, please try again later!"
          onDismiss={() => {
            setDeleteError(false);
          }}
        />
      ) : null}
    </div>
  );
}
