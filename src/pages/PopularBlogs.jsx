import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Assuming your Firestore config is exported here
import BlogCard from "../components/BlogCard";

const PopularBlogs = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const limitDescription = (description, limit = 250) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  useEffect(() => {
    // Function to fetch the most popular blogs
    const fetchPopularBlogs = async () => {
      setLoading(true);
      try {
        // Query the blogs collection, ordering by clicks in descending order
        const blogsRef = collection(db, "blogs");
        const q = query(blogsRef, orderBy("clicks", "desc"), limit(5)); // You can change the limit to show more blogs
        // Get the data from Firestore
        const querySnapshot = await getDocs(q);
        // Store the fetched blogs in the state
        const blogsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPopularBlogs(blogsList);
      } catch (error) {
        console.error("Error fetching popular blogs: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularBlogs();
  }, []);

  if (loading) {
    return <p>Loading popular blogs...</p>;
  }

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
    <div className="p-6 mx-auto mt-20">
      <h2 className="text-xl font-bold text-center underline">Popular Blogs</h2>
      <div className="grid max-w-4xl grid-cols-1 gap-6 p-6 mx-auto sm:grid-cols-2 lg:grid-cols-2">
        {popularBlogs.length === 0 ? (
          <p>No popular blogs available.</p>
        ) : (
          popularBlogs.map((blog) => (
            <BlogCard
              blog={blog}
              limitDescription={limitDescription}
              handleBlogClick={handleBlogClick}
              clicks={blog.clicks}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PopularBlogs;
