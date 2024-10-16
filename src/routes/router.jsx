import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import BlogDisplay from "../pages/BlogDisplay";
import BlogForm from "../pages/BlogForm";
import BlogPages from "../pages/BlogPages";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import UserBlogs from "../pages/UserBlogs";
import errorImage from "../assets/error-404-page-not-found-vector-14463951.jpg";
import NavBar from "../components/NavBar";

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
        element: (
          <PrivateRoute>
            <BlogForm />
          </PrivateRoute>
        ),
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
      {
        path: "userBlogs",
        element: (
          <PrivateRoute>
            <UserBlogs />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: (
      <div>
        <NavBar />
        <img src={errorImage} alt="" className=" object-scale-down " />
      </div>
    ),
  },
]);

export default router;
