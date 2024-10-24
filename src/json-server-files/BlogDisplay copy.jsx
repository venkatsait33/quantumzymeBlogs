import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PageCover from "../components/PageCover";
import RecentPost from "../components/RecentPost";
import { BiArrowBack } from "react-icons/bi";

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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
      fetchBlog();
    }
  }, [id]);

  const renderTables = (tables) => {
    return tables.map((table, tableIndex) => (
      <div key={tableIndex} className="m-4 overflow-x-auto">
        <table className="table table-zebra-zebra">
          <thead>
            <tr>
              {table.headings.map((heading, headingIndex) => (
                <th key={headingIndex} className="px-4 py-2 border">
                  {heading || `Heading ${headingIndex + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  return (
    <div>
      {/* Back Arrow Button */}
      <div className="fixed z-50 mt-20 top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="text-xl btn btn-sm btn-outline btn-primary"
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
          {Object.keys(blogs).length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <div
              key={blogs.id}
              className="p-2 mb-8 overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex">
                <div className="mt-12">
                  {blogs.title && (
                    <h2 className="mb-4 text-5xl font-bold text-center">
                      {blogs.title}
                    </h2>
                  )}

                  <div className="flex items-center mb-4 justify-evenly">
                    {blogs.author && (
                      <p className="flex items-center justify-center">
                        <span className="text-base">Author:&nbsp;</span>
                        <span className="text-xl font-semibold">
                          {blogs.author}
                        </span>
                      </p>
                    )}
                    {blogs.publishedDate && <p className="text-xl">|</p>}

                    {blogs.publishedDate && (
                      <p className="flex items-center justify-center">
                        <span className="text-base">
                          Date of Publishing: &nbsp;
                        </span>
                        <span className="text-xl font-semibold">
                          {blogs.publishedDate}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="m-2 divider"></div>

                  <p
                    style={{
                      wordBreak: "break-word",
                      marginBottom: "20px",
                      lineHeight: "1.6",
                      textIndent: "25px",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: blogs.description }}
                    />
                  </p>
                  {blogs.sections &&
                    blogs.sections.map((section, index) => (
                      <div key={index}>
                        {section.image && (
                          <>
                            {section.image && (
                              <img
                                src={section.image}
                                alt={`Image ${index}`}
                                className="object-scale-down w-full h-full rounded"
                              />
                            )}
                            {section.imageTitle && (
                              <h2 className="mt-2 text-center">
                                {section.imageTitle}
                              </h2>
                            )}
                          </>
                        )}
                        {section.content && (
                          <div>
                            <p
                              style={{
                                wordBreak: "break-word",
                                marginBottom: "20px",
                                marginTop: "15px",
                                lineHeight: "1.6",
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
                        {section.tables &&
                          section.tables.length > 0 &&
                          renderTables(section.tables)}
                      </div>
                    ))}
                  {blogs.reference && (
                    <div>
                      <h1 className="mb-4 text-2xl font-bold">Reference</h1>
                      <p
                        style={{
                          wordBreak: "break-word",
                          marginBottom: "20px",
                          lineHeight: "1.6",
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
