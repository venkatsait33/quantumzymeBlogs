import { useBlogContext } from "../context/BlogContext";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Blogs = () => {
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
    <div className="w-full mx-auto">
      <h1 className="text-3xl font-bold text-center underline ">Blogs</h1>
      <div className="grid gap-6 p-6 mx-auto grid-cols- sm:grid-cols-2 lg:grid-cols-2">
        {blogs.length === 0 ? (
          <div className="mt-10 text-center block-center">
            <p className=" btn">No blogs available.</p>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              key={index}
            >
              <BlogCard
                blog={blog}
                limitDescription={limitDescription}
                handleBlogClick={handleBlogClick}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
