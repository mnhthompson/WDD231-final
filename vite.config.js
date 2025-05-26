import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        quiz: resolve(__dirname, "src/quiz.html"),
        results: resolve(__dirname, "src/results.html")
      }
    }
  }
});