import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentPost = () => {
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
    // Scrollable recent post titles inside the fixed/sticky container
    <div className="max-h-[calc(100vh-5rem)] overflow-y-auto p-2">
      {blogs.length === 0 ? (
        <p>No Recent blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className="block mb-4">
            <h2 className="text-base hover:underline">{blog.title}</h2>
          </Link>
        ))
      )}
    </div>
  );
};

export default RecentPost;
