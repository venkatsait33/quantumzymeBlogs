import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import PageCover from "../components/PageCover";
import RecentPost from "../components/RecentPost";
import { BiArrowBack } from "react-icons/bi";

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    <div>
      {/* Back Arrow Button - Fixed position on screen */}
      <div className="fixed z-50 mt-20 top-4 left-4">
        <button
          onClick={() => navigate(-1)} // Navigates to the previous page
          className="btn btn-sm hover:bg-gray-200 hover:text-gray-700"
        >
          <BiArrowBack className="text-xl" />
        </button>
      </div>

      <div className="p-2 mt-14">
        <PageCover blogs={blogs} />
      </div>
      <div className="flex">
        {/* Main content area */}
        <div className="p-6 mx-auto w-[70%] sm:w-full">
          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <div
              key={blogs.id}
              className="mb-8 overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex">
                <div className="mt-12">
                  <h2 className="mb-4 text-5xl font-bold text-center">
                    {blogs.title}
                  </h2>
                  <div className="flex items-center mb-4 justify-evenly">
                    <p>
                      <strong>Author:</strong> {blogs.author}
                    </p>
                    <p>
                      <strong>Date of Publishing:</strong> {blogs.publishedDate}
                    </p>
                  </div>
                  <p style={{ wordBreak: "break-word", marginBottom: "20px" }}>
                    <div
                      dangerouslySetInnerHTML={{ __html: blogs.description }}
                    />
                  </p>
                  {blogs.sections &&
                    blogs.sections.map((section, index) => (
                      <div key={index}>
                        <img
                          src={section.image}
                          alt={`Image ${index}`}
                          className="object-scale-down w-full"
                        />
                        <h2 className="text-base text-center">
                          {section.imageTitle}
                        </h2>
                        {section.content && (
                          <div>
                            <p
                              style={{
                                wordBreak: "break-word",
                                marginBottom: "20px",
                              }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: section.content,
                                }}
                              />
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  {blogs.reference && (
                    <div>
                      <h1 className="mb-4 text-2xl font-bold">Reference</h1>
                      <p
                        style={{
                          wordBreak: "break-word",
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: blogs.reference }}
                        />
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar area - Hidden on small screens */}
        <div className="sm:hidden md:block w-[20%] mt-10">
          <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <RecentPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDisplay;
