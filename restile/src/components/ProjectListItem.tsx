import { useState } from "react";
import Modal from "src/components/Modal";

interface ProjectListItemProps {
  id: string;
  thumbnailURL: string | undefined;
  title: string;
  tags: string[] | undefined;
  onDelete: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function ProjectListItem({
  id,
  thumbnailURL,
  title,
  tags,
  onDelete,
}: ProjectListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  async function handleDelete(ProjectID: string) {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/projects/${ProjectID}`, {
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
      <span className="min-w-16 text-center">{id}</span>
      <img
        src={
          thumbnailURL ? thumbnailURL : "/Hernandez_renovations_logo_white.svg"
        }
        alt={title}
        className="size-12 aspect-square rounded-sm"
      />
      <h2 className="truncate w-42 ml-4">{title}</h2>

      {/* Project Tags */}
      <div className="ml-2 hidden md:flex grow items-center  overflow-x-scroll no-scrollbar gap-2 h-full">
        {tags ? (
          tags.map((tag) => (
            <span className="bg-gray-700 rounded-md border-gray-600 border-2 px-2 py-0.5">
              {tag}
            </span>
          ))
        ) : (
          <span className="">No tags...</span>
        )}
      </div>
      {/* Edit Button */}
      <button className="flex flex-shrink-0 items-center justify-center size-10 rounded-md transition-all hover:bg-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          className="size-6 stroke-gray-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      {/* Delete Button */}
      <button
        className="flex flex-shrink-0 relative items-center justify-center size-10 rounded-md transition-all hover:bg-red-800"
        onClick={() => {
          handleDelete(id);
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
          title="Delete Project Failed!"
          message="Unable to delete the project, please try again later!"
          onDismiss={() => {
            setDeleteError(false);
          }}
        />
      ) : null}
    </div>
  );
}
