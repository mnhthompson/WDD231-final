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
        quiz1: resolve(__dirname, "src/quizkanto.html"),
        quiz2: resolve(__dirname, "src/quizjohto.html"),
        quiz3: resolve(__dirname, "src/quizhoenn.html"),
        quiz4: resolve(__dirname, "src/quizsinnoh.html"),
        quiz5: resolve(__dirname, "src/quizunova.html"),
        quiz6: resolve(__dirname, "src/quizkalos.html"),
        quiz7: resolve(__dirname, "src/quizalola.html"),
        quiz8: resolve(__dirname, "src/quizgalar.html"),
        quiz9: resolve(__dirname, "src/quizpaldea.html"),
        results: resolve(__dirname, "src/results.html")
      }
    }
  }
});