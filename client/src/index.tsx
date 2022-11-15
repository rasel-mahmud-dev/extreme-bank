/* @refresh reload */
import { createRoot } from "react-dom/client";

import "./index.css";
import Router from "./routes/Router";
import AppProvider from "./context/AppProvider";



createRoot(document.getElementById("root") as HTMLElement).render(
	<AppProvider>
		<Router />
	</AppProvider>
)
