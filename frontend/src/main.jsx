import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// ROOT APP COMPONENT
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <Suspense fallback={<div>LOADING</div>}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Suspense>
);
