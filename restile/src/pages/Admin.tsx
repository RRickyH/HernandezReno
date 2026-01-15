import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "src/components/navigation/NavBar";
import ProjectListItem from "src/components/ProjectListItem";
import TagListItem from "src/components/TagListItem";
import { getProjects, getTags } from "src/services/projects";
import { getImageURL, Project } from "src/services/types";
import { SiteContext } from "src/Context";
import { updateConfig } from "src/services/config";
import ProjectAddCard from "src/components/ProjectAddCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectFetchError, setProjectFetchError] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagFetchError, setTagFetchError] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const { config, setConfig } = useContext(SiteContext);

  // Use the context data as the initial form state
  const [configForm, setConfigForm] = useState(config);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/check`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error();
        setAuthenticated(true);
        await updateProjects();
        await updateTags();
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    checkAuth();
  }, [location.pathname, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("Saving data:", configForm);
    await updateConfig(configForm);
    setConfig(configForm);
    console.log("Saved data successfully");
    setIsSaving(false);
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900">
        <div className="animate-pulse">
          <img
            alt="Logo"
            src="/Hernandez_renovations_sticker.svg"
            className="w-32 h-32"
          />
        </div>
      </div>
    );
  }

  async function updateProjects() {
    try {
      const projects = await getProjects();
      setProjects(projects);
      setProjectFetchError(false);
      console.log("fetched projects: ", projects);
    } catch {
      setProjects([]);
      setProjectFetchError(true);
    }
  }

  async function updateTags() {
    try {
      const tags = await getTags();
      setTags(tags);
      setTagFetchError(false);
    } catch (error) {
      if (error instanceof Error) {
        setTagFetchError(true);
        console.error(error.message);
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-50 border-b border-gray-800">
        <NavBar items={[]} />
      </header>

      <main className="max-w-5xl mx-auto w-full p-6 md:p-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Site Configuration</h1>
          <p className="text-gray-400 mt-2">
            Update the content and images for the main website.
          </p>
        </div>
        {/* Site Settings Configurations */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-xl mb-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section: Hero Content */}
            <h1 className="text-2xl font-bold mb-4">Site Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-amber-400 font-semibold uppercase tracking-wider text-sm">
                  Main Hero
                </h2>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Title Text
                  </label>
                  <input
                    type="text"
                    value={configForm.titleText}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        titleText: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Accent Text
                  </label>
                  <input
                    type="text"
                    value={configForm.accentText}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        accentText: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-amber-400 font-semibold uppercase tracking-wider text-sm">
                  Visuals
                </h2>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    value={configForm.heroImageURL}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none transition-all font-mono text-xs"
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        heroImageURL: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    About Hero URL
                  </label>
                  <input
                    type="text"
                    value={configForm.aboutImageURL}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none transition-all font-mono text-xs"
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        aboutImageURL: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-700" />

            {/* Section: Text Areas */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Tag Line
                </label>
                <textarea
                  rows={2}
                  value={configForm.tagLine}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  onChange={(e) =>
                    setConfigForm({ ...configForm, tagLine: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  About Description
                </label>
                <textarea
                  rows={4}
                  value={configForm.aboutDescription}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      aboutDescription: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full md:w-48 flex justify-center py-3 px-4 rounded-lg shadow-lg text-sm font-bold uppercase tracking-widest text-gray-900 bg-amber-400 hover:bg-amber-300 focus:ring-2 focus:ring-amber-500 transition-all disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Update"}
              </button>
            </div>
          </form>
        </div>

        {/* Projects Configurations */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-xl mb-10">
          <h1 className="text-2xl font-bold mb-4">Projects</h1>

          {/* Project list */}
          <div className="flex flex-col justify-stretch h-96 bg-gray-900 border-gray-700/50 p-4 rounded-md gap-2">
            <div className="flex flex-row items-center justify-between gap-2 p-2 font-semibold">
              <label className="text-center w-16">ID</label>
              <label className="w-12">Image</label>
              <label className="ml-4 w-42 text-start">Title</label>
              <label className="ml-2 flex grow text-start">Tags</label>
              <button
                className="flex flex-shrink-0 relative items-center justify-center size-10 rounded-md transition-all hover:bg-gray-700"
                onClick={updateProjects}
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
              <button
                className="flex flex-shrink-0 relative items-center justify-center size-10 rounded-md transition-all hover:bg-gray-700"
                onClick={() => {
                  setIsAddingProject(true);
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
            </div>
            <hr className="border-gray-700 border-2" />
            {projectFetchError ? (
              <span>Error fetching projects, please try again</span>
            ) : null}
            {!projectFetchError && projects ? (
              <ul className="flex flex-col justify-stretch overflow-y-scroll no-scrollbar grow divide-y-2 divide-gray-700">
                {projects.map((project) => (
                  <li className="p-2">
                    <ProjectListItem
                      title={project.title}
                      id={project.id ? String(project.id) : ""}
                      thumbnailURL={
                        project.imageKeys
                          ? getImageURL(project.imageKeys[0])
                          : undefined
                      }
                      tags={project.tags}
                      onDelete={() => {
                        updateProjects();
                        updateTags();
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <span className="p-2">No projects.</span>
            )}
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Tags</h1>

          {/* Tags List */}
          <div className="flex flex-col justify-stretch h-96 bg-gray-900 border-gray-700/50 p-4 rounded-md gap-2">
            <div className="flex flex-row items-center justify-between gap-2 p-2">
              <label className="flex grow text-start font-bold">Tags</label>
              <button
                className="flex flex-shrink-0 relative items-center justify-center size-10 rounded-md transition-all hover:bg-gray-700"
                onClick={updateTags}
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
            <hr className="border-gray-700 border-2" />
            {tagFetchError ? (
              <span>Error fetching tags, please try again</span>
            ) : null}
            {!tagFetchError && tags ? (
              <ul className="flex flex-col justify-stretch overflow-y-scroll no-scrollbar grow divide-y-2 divide-gray-700">
                {tags.map((tag) => (
                  <li className="p-2">
                    <TagListItem
                      name={tag}
                      onDelete={() => {
                        updateProjects();
                        updateTags();
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <span className="p-2">No tags.</span>
            )}
          </div>
        </div>
        {isAddingProject ? (
          <ProjectAddCard
            onAdd={async () => {
              await updateProjects();
              await updateTags();
              setIsAddingProject(false);
            }}
            onCancel={async () => {
              await updateProjects();
              await updateTags();
              setIsAddingProject(false);
            }}
          />
        ) : null}
      </main>
    </div>
  );
}
