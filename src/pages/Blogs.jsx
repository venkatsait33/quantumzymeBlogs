import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blogs");
        setBlogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl p-6 mx-auto mt-12">
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className="mb-8">
            <div className="shadow-xl card bg-base-100 w-96">
              <figure>
                <img
                  src={blog.coverImage}
                  className="object-cover w-full h-64"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <div className="flex items-center mb-4 justify-evenly">
                  <p>
                    <strong>Author:</strong> {blog.author}
                  </p>
                  <p>
                    <strong>Date of Publishing:</strong> {blog.publishedDate}
                  </p>
                </div>
                <p className="p-2 overflow-hidden text-base text-ellipsis-2">
                  {blog.description}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Blogs;
