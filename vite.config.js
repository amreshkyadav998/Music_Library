import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "music_library",
      filename: "remoteEntry.js",
      exposes: {
        "./MusicLibrary": "./src/MusicLibrary.jsx",
        "./Sidebar": "./src/components/Sidebar.jsx",
      },
      shared: ["react", "react-dom", "react-router-dom", "lucide-react"],
    }),
    {
      name: "vite-plugin-notify-host-on-rebuild",
      apply(config, { command }) {
        return Boolean(command === "build" && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            await fetch("http://localhost:4173/__fullReload");
          } catch (e) {
            // noop
          }
        }
      },
    },
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 4174,
  },
});
