import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import BlogDisplay from "../pages/BlogDisplay";
import BlogForm from "../pages/BlogForm";
import BlogPages from "../pages/BlogPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addBlog",
        element: <BlogForm />,
      },
      {
        path: "blogPages",
        element: <BlogPages />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDisplay />,
      },
    ],
  },
]);

export default router;
