import { useEffect, useState } from "react";

import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!currentUser) {
        return;
      }

      try {
        const userId = currentUser.uid; // Get the current user's UID
        const blogsRef = collection(db, "blogs"); // Reference to 'blogs' collection

        // Query to find blogs where 'userId' matches the logged-in user's UID
        const q = query(blogsRef, where("userId", "==", userId));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Store the blog data in state
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserBlogs(blogs);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      } finally {
        setLoading(false); // Stop loading spinner after data fetch
      }
    };

    fetchUserBlogs();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while fetching
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto  ">
      <div>
        <h1 className="text-2xl font-bold text-center">My Blogs</h1>
        {userBlogs.length === 0 ? (
          <p>No blogs found for this user.</p>
        ) : (
          <ul className="mt-4">
            <div className="grid max-w-4xl grid-cols-1 gap-6 p-6 mx-auto sm:grid-cols-2 lg:grid-cols-2">
              {userBlogs.map((blog) => (
                <li key={blog.id} className="">
                  <BlogCard blog={blog} key={blog.id} />
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
