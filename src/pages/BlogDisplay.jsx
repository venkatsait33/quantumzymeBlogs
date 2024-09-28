import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${id}`);
        setBlogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching the blog", error);
      }
    };

    if (id) {
      fetchBlog(); // Fetch blog when component mounts or id changes
    }
  }, [id]);
  return (
    <div className="max-w-4xl p-6 mx-aut">
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div key={blogs.id} className="mb-8">
          <div
            style={{
              backgroundImage: `url(${blogs.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
              width: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            <h1 className="text-4xl font-bold">{blogs.title}</h1>
          </div>
          <h2 className="mb-4 text-5xl font-bold text-center">{blogs.title}</h2>
          <div className="flex items-center mb-4 justify-evenly">
            <p>
              <strong>Author:</strong> {blogs.author}
            </p>
            <p>
              <strong>Date of Publishing:</strong> {blogs.publishedDate}
            </p>
          </div>
          <p
            style={{
              wordBreak: "break-word", // Ensures long words don't overflow
              marginBottom: "20px",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: blogs.description }} />
          </p>
          {blogs.images &&
            blogs.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img.imageUrl}
                  alt={`Image ${index}`}
                  className="object-scale-down w-full "
                />
                <h2 className="text-base text-center">{img.imageTitle}</h2>
              </div>
            ))}
          {blogs.content &&
            blogs.content.map((text, index) => (
              <div key={index}>
                <p
                  style={{
                    wordBreak: "break-word", // Ensures long words don't overflow
                    marginBottom: "20px",
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BlogDisplay;
