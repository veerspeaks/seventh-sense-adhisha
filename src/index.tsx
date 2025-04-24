import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomeScreen } from "./screens/HomeScreen";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HomeScreen />
  </StrictMode>,
);
