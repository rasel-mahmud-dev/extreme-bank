/* @refresh reload */
import { createRoot } from "react-dom/client";

import "./index.css";
import Router from "./routes/Router";

createRoot(document.getElementById("root") as HTMLElement).render(<Router /> )
