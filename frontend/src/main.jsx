import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Loading from "app/components/Loading";
import "./index.css";
import "./css/Globals.css"

import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer />
        <App />
      </BrowserRouter>
    </StrictMode>
  </Suspense>
);
