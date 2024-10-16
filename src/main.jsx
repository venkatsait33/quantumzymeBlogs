import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { BlogProvider } from "./context/BlogContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <BlogProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </BlogProvider>
);
