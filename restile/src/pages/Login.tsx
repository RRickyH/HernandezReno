import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "src/components/navigation/NavBar.tsx";
import { login } from "src/services/auth.ts";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_URL}/check`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          navigate("/admin");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unexpected error occurred", error);
        }
      }
    };
    checkAuth();
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", formData);
    try {
      await login(formData.username, formData.password);
    } catch (error) {
      console.error(error);
      setError(error.message);
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="sticky top-0 z-50">
        <NavBar items={[]} />
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 flex-grow">
        <div className="hidden md:flex bg-gray-800 items-center justify-center relative">
          <div className="text-center">
            <img
              alt="Hernandez Renovations Logo"
              src="/Hernandez_renovations_sticker.svg"
              className="w-64 h-64 mb-4"
            />
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {error ? <h3 className="text-md text-red-500">{error}</h3> : null}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-50">
                    Username
                  </label>
                  <input
                    type="username"
                    required
                    className="mt-1 block w-full px-3 py-2 border text-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-50">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border text-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-amber-400 border-2 border-gray-600 bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
