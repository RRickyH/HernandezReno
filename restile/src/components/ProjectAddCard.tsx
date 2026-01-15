import { useState, useEffect } from "react";
import TagButton from "src/components/TagButton.tsx";
import Modal from "./Modal.tsx";

const API_URL = import.meta.env.VITE_API_URL;

interface ProjectAddProps {
  onAdd: () => void;
  onCancel: () => void;
}

interface projectFormType {
  title: string;
  description: string;
}

export default function ProjectAddCard({ onAdd, onCancel }: ProjectAddProps) {
  const [projectForm, setProjectForm] = useState<projectFormType>({
    title: "",
    description: "",
  });
  const [tags, setTags] = useState(new Set());
  const [newTag, setNewTag] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string>("");

  async function handleAdding() {
    setIsAdding(true);
    const token = localStorage.getItem("token");
    try {
      // Check to make sure that the correct fields have been entered...
      if (projectForm.title === "") {
        throw new Error("Null title");
      }
      const projectDetails = {
        title: projectForm.title,
        description: projectForm.description,
        tags: [...tags],
      };
      console.log(JSON.stringify(projectDetails));
      let response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        body: JSON.stringify(projectDetails),
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to add project");
      }
      const projectID = (await response.json()).id;

      // Get presigned URLs from the storage provider and upload images one by one.
      const imageKeys: string[] = [];
      const failedImages: File[] = [];
      for (const image of imageFiles) {
        let response = await fetch(
          `${API_URL}/uploader?${new URLSearchParams({ filename: image.name, projectID: projectID, contentType: image.type }).toString()}`,
          { method: "POST", headers: { Authorization: `Bearer ${token}` } },
        );
        if (!response.ok) {
          console.log("Unable to get presigned url", image.name);
          throw new Error("Failed to get presigned url");
        }
        const json = await response.json();

        response = await fetch(json.url, {
          method: "PUT",
          body: image,
          headers: { "Content-Type": image.type },
        });
        if (!response.ok) {
          failedImages.push(image);
          console.error("Image upload failed", response.text());
        }

        imageKeys.push(json.objectKey); // Image uploaded successfully
      }

      // Remove failed images.
      setImageFiles(imageFiles.filter((file) => !failedImages.includes(file)));

      // Update project with new project keys.
      response = await fetch(`${API_URL}/projects/${projectID}`, {
        method: "PATCH",
        body: JSON.stringify({ imageKeys: imageKeys }),
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        console.error("Failed to update project with imageKeys");
        throw new Error("Failed to add imageKeys to project");
      }

      onAdd();
    } catch (error) {
      if (error instanceof Error) {
        setAddError(error.message);
        console.log(error.message);
      }
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-md bg-white p-6 w-128 h-186 overflow-hidden">
        <div className="flex items-center justify-between mb-5 gap-8 w-full">
          <h1 className="text-2xl text-gray-900 font-bold">Add Project</h1>
          <button
            className="flex items-center justify-center rounded-md bg-gray-800 aspect-square size-8 p-1.5"
            onClick={onCancel}
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
        <form className="flex flex-col items-center justify-start gap-8 text-gray-800 overflow-y-scroll w-full">
          {/* Title */}
          <div className="flex flex-col items-start justify-center gap-2 w-full">
            <label className="text-start">Title</label>
            <input
              className="w-full border-1 border-gray-300 rounded-md p-2"
              placeholder="My super project"
              value={projectForm.title}
              onChange={(e) => {
                setProjectForm({ ...projectForm, title: e.target.value });
              }}
            />
          </div>
          {/* Description */}
          <div className="flex flex-col items-start justify-center gap-2 w-full">
            <label className="text-start">Description</label>
            <textarea
              rows={4}
              className="w-full border-1 border-gray-300 rounded-md p-2 resize-none"
              value={projectForm.description}
              onChange={(e) => {
                setProjectForm({ ...projectForm, description: e.target.value });
              }}
              placeholder="My project description"
            />
          </div>
          {/* Tags */}
          <div className="flex flex-col items-start justify-center gap-2 w-full">
            <label className="text-start">Tags</label>
            <div className="flex items-center justify-center gap-2 w-full h-12">
              <input
                placeholder="new tag..."
                className="px-4 py-2 rounded-lg bg-gray-300 max-w-24"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button
                type="submit"
                className="flex flex-shrink-0 relative items-center justify-center size-10 rounded-md transition-all hover:bg-gray-100"
                onClick={() => {
                  if (newTag !== "") {
                    const newTags = new Set(tags);
                    newTags.add(newTag);
                    setTags(newTags);
                    setNewTag("");
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="size-6 stroke-3 stroke-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <div className="flex gap-2 overflow-x-scroll no-scrollbar grow h-full p-2 select-none">
                {[...tags].map((tag) => (
                  <TagButton
                    tag={tag}
                    onClick={(tag: string) => {
                      const newTags = new Set(tags);
                      newTags.delete(tag);
                      setTags(newTags);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Images */}
          <div className="flex flex-col items-start justify-center gap-2 w-full">
            <label className="text-start">Images</label>
            <div className="flex items-center justify-center gap-2 w-full">
              <input
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setImageFiles([
                      ...imageFiles,
                      ...Array.from(e.target.files),
                    ]);
                    e.target.value = "";
                  } else {
                    console.log("no new files...");
                  }
                }}
                className="text-transparent file:px-4 file:py-2 file:border-gray-300 file:border-2 file:text-gray-500 hover:file:border-blue-700 hover:file:bg-blue-700 file:rounded-lg hover:file:text-white  w-full grow cursor-pointer file:transition-all"
              />
            </div>
            <div className="grid grid-cols-3 bg-gray-300 rounded-xl w-full h-64 overflow-y-scroll">
              {imageFiles.map((imageFile) => (
                <ImageTile
                  image={imageFile}
                  onDelete={() => {
                    setImageFiles(
                      imageFiles.filter((file) => file !== imageFile),
                    );
                  }}
                />
              ))}
            </div>
          </div>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full select-none hover:bg-blue-800 hover:scale-98 transition-all"
            type="button"
            onClick={handleAdding}
          >
            {isAdding ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
      {addError !== "" ? (
        <Modal
          title="Add Project Error..."
          message={`An error occurred while adding the project: ${addError}`}
          onDismiss={onCancel}
        />
      ) : null}
    </div>
  );
}

function ImageTile({ image, onDelete }: { image: File; onDelete: () => void }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const newURL = URL.createObjectURL(image);
    setUrl(newURL);

    return () => {
      URL.revokeObjectURL(newURL);
    };
  }, [image]);

  return (
    <button
      className="flex aspect-square group relative"
      onClick={() => {
        URL.revokeObjectURL(url);
        onDelete();
      }}
    >
      <img className="object-cover size-full" src={url} alt="project image" />
      <div className="inset-0 absolute opacity-0 group-hover:opacity-1000 bg-black/40 backdrop-blur-xs transition-all cursor-pointer p-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="inset-0 stroke-gray-100 opacity-0 group-hover:opacity-100 transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </button>
  );
}
