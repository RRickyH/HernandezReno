import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "src/components/navigation/NavBar.tsx";
import { SiteContext } from "src/Context.tsx";
import { updateConfig } from "src/services/config.ts";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
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
      } catch (error) {
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

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section: Hero Content */}
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
      </main>
    </div>
  );
}
