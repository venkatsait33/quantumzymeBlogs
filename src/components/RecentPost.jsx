import axios from "axios";
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentPost = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blogs");
        setBlogs(response.data);
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
        <div>
          <h1 className="mb-4 text-2xl font-bold">Recent Posts</h1>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`} className="block mb-4">
                <h2 className="text-base font-semibold hover:underline">
                  {blog.title}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentPost;
