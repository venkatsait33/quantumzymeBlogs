import { Link } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";

const RecentPost = () => {
  const { blogs, loading } = useBlogContext();

  if (loading) return <p>Loading...</p>;

  // Sort blogs by createdAt in descending order (most recent first)
  const sortedBlogs = blogs
    .slice() // Create a shallow copy of blogs
    .sort((a, b) => {
      // Ensure createdAt exists and is a valid Timestamp
      const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
      const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
      return bDate - aDate;
    });

  return (
    <div className="max-h-[calc(100vh-5rem)] overflow-y-auto p-2">
      {sortedBlogs.length === 0 ? (
        <p>No Recent blogs available.</p>
      ) : (
        <div>
          <h1 className="mb-4 text-2xl font-bold">Recent Posts</h1>
          <div className="m-2 divider divider-neutral"></div>
          {/* Limit to only 5 most recent posts */}
          <div className="flex flex-col gap-2">
            {sortedBlogs.slice(0, 5).map((blog) => (
              <div key={blog.id} className="space-x-2 ">
                <Link to={`/blogs/${blog.id}`} className="block ">
                  <h2 className="text-base font-semibold hover:underline">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-sm ">
                  Posted on{" "}
                  {blog.createdAt?.toDate
                    ? blog.createdAt.toDate().toLocaleDateString()
                    : "Unknown Date"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentPost;
