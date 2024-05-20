import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        toastOptions={{
          position: "top-center",
          duration: 1500,
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
