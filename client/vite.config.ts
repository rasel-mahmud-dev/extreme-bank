import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import * as path from "path"
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "components": path.resolve(__dirname, "./src/components"),
      "app": path.resolve(__dirname, "./src"),
      "context": path.resolve(__dirname, "./src/context")
    }
  },
  build: {
    target: 'esnext',
  },
});
