import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import {
  collection,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Card from "./Card";

const CarouselImages = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const limitDescription = (description, limit = 250) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  // Function to chunk blogs into groups for carousel slides
  const chunkArray = (arr, chunkSize) => {
    let chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  useEffect(() => {
    // Function to fetch the most popular blogs
    const fetchPopularBlogs = async () => {
      setLoading(true);
      try {
        const blogsRef = collection(db, "blogs");
        const q = query(blogsRef, orderBy("clicks", "desc"), limit(5)); // Adjust limit as needed
        const querySnapshot = await getDocs(q);
        const blogsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPopularBlogs(blogsList);

        // Chunk the blogs into groups for carousel slides
        const chunkedItems = chunkArray(blogsList, 1); // Adjust chunk size (e.g., 2 blogs per slide)
        setItems(chunkedItems);
      } catch (error) {
        console.error("Error fetching popular blogs: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularBlogs();
  }, []);

  const handleBlogClick = async (blogId) => {
    const blogRef = doc(db, "blogs", blogId);
    try {
      await updateDoc(blogRef, {
        clicks: increment(1),
      });
    } catch (error) {
      console.error("Error updating clicks count: ", error);
    }
  };

  // Customize the responsive settings for the carousel

  return (
    <div className="w-full ">
      <div className="flex flex-row w-full max-w-screen-xl gap-3 overflow-auto carousel rounded-box max-md:max-w-2xl max-sm:max-w-sm">
        {popularBlogs.map((group, index) => (
          <div key={index} className="m-2 ">
            <div key={group.id} className="w-full h-full">
              <Card
                blog={group}
                handleBlogClick={handleBlogClick}
                clicks={group.clicks}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselImages;