import { Link } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import BlogCard from "../components/BlogCard";

const StickyBlogs = () => {
  const { blogs, loading } = useBlogContext();

  if (loading) return <p>Loading...</p>;

  const limitDescription = (description, limit = 250) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  const handleBlogClick = async (blogId) => {
    const blogRef = doc(db, "blogs", blogId);
    // Increment the clicks field by 1
    try {
      // Increment the clicks field by 1
      await updateDoc(blogRef, {
        clicks: increment(1), // Use Firestore's increment function
      });
    } catch (error) {
      console.error("Error updating clicks count: ", error);
    }
  };

  return (
    <div className="max-lg:w-[85%] mx-auto">
      <h1 className="text-3xl font-bold text-center underline ">Sticky Blogs</h1>
      <div className="grid grid-cols-1 gap-6 p-6 mx-auto ">
        {blogs.length === 0 ? (
          <div className="mt-10 text-center block-center">
            <p className=" btn">No blogs available.</p>
          </div>
        ) : (
          blogs
            .slice(0, 4)
            .map((blog) => (
              <BlogCard
                blog={blog}
                limitDescription={limitDescription}
                handleBlogClick={handleBlogClick}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default StickyBlogs;
