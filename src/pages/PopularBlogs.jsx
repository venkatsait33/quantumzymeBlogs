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
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig"; // Assuming your Firestore config is exported here

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
    <div className="p-6 mx-auto mt-16">
      <h2 className="text-xl font-bold text-center">Popular Blogs</h2>
      <div className="grid max-w-4xl grid-cols-1 gap-6 p-6 mx-auto sm:grid-cols-2 lg:grid-cols-2">
        {popularBlogs.length === 0 ? (
          <p>No popular blogs available.</p>
        ) : (
          popularBlogs.map((blog) => (
            <Link
              to={`/blogs/${blog.id}`}
              key={blog.id}
              className="mb-8 "
              onClick={() => handleBlogClick(blog.id)}
            >
              <div className="w-full h-full transition duration-300 delay-150 shadow-xl cease-in-out card bg-base-300 hover:-translate-y-1 hover:scale-90 ">
                {blog.coverImage && (
                  <figure>
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="object-cover w-full p-2 h-44 image-full "
                    />
                  </figure>
                )}

                <div className="flex flex-col justify-between card-body">
                  <h2 className="text-lg font-bold card-title">{blog.title}</h2>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <p>{blog.author}</p>
                    {blog.author && <p>|</p>}
                    <p>{blog.publishedDate}</p>
                  </div>
                  <p className="overflow-hidden text-ellipsis">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: limitDescription(
                          blog.coverText || blog.description
                        ),
                      }}
                    />
                  </p>

                  <p className="mt-2 font-semibold text-primary">Read More</p>
                  <div className="justify-end ">
                    <p className="text-sm btn btn-sm btn-secondary">
                      {blog.clicks} {blog.clicks === 1 ? "Click" : "Clicks"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularBlogs;
