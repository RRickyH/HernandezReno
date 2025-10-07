import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",
    plugins: [react(), tailwindcss()],
    preview: {
      port: 5173,
      strictPort: true,
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      allowedHosts: env.ALLOWED_HOSTS?.split(","),
      origin: "http://localhost:5173",
    },
    resolve: {
      alias: {
        src: "/src",
      },
    },
  };
});
