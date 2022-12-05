import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: "0.0.0.0",
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, "./src/components"),
            app: path.resolve(__dirname, "./src"),
            context: path.resolve(__dirname, "./src/context"),
            src: path.resolve(__dirname, "./src/"),
            pages: path.resolve(__dirname, "./src/pages"),
            types: path.resolve(__dirname, "./src/types"),
            // axios: path.resolve(__dirname, "./src/axios"),
            utils: path.resolve(__dirname, "./src/utils"),
        },
    },
    build: {
        target: "esnext",
    },
});
