import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Loading from "app/components/Loading";
import "./index.css";
// ROOT APP COMPONENT
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <Suspense
    fallback={
      <div>
        <Loading />
      </div>
    }
  >
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Suspense>
);
