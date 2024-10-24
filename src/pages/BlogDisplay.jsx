import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { BiUpArrowAlt } from "react-icons/bi"; // Import arrow-up icon
import PageCover from "../components/PageCover";
import RecentPost from "../components/RecentPost";
import { useBlogContext } from "../context/BlogContext";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { div } from "framer-motion/client";

const BlogDisplay = () => {
  const { blogs, loading } = useBlogContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  };

  const renderTables = (tables, tableTitles) => {
    return tables.map((table, tableIndex) => (
      <div key={tableIndex} className="m-4 overflow-x-auto w-[80%]">
        <table className="md:table ">
          <thead>
            <tr>
              {table.headings.map((heading, headingIndex) => (
                <th key={headingIndex} className="px-4 py-2 text-white border">
                  {heading || `Heading ${headingIndex + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => {
              // Process each row
              const rowArray = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(
                (cell) => cell.trim().replace(/^"|"$/g, "") // Trim and remove quotes
              );
              // If row has fewer cells than headings, add empty cells
              while (rowArray.length < table.headings.length) {
                rowArray.push(""); // Add empty cells if row is short
              }
              return (
                <tr key={rowIndex}>
                  {rowArray.map((cell, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 border">
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {tableTitles && tableTitles.length > 0 && (
          <div>
            <h3 className="mt-2 mb-2 text-lg font-bold text-center">
              {(tableTitles && tableTitles[tableIndex]) ||
                `Table ${tableIndex + 1}`}
            </h3>
          </div>
        )}
      </div>
    ));
  };

  if (loading) return <p>Loading...</p>;

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) return <p>Blog not found</p>;

  return (
    <div>
      {/* Back Arrow Button */}
      <div className="fixed z-50 mt-20 top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="text-xl btn btn-sm hover:btn-outline"
        >
          <BiArrowBack className="text-xl" />
        </button>
      </div>

      <div className="mt-14 ">
        <PageCover blog={blog} />
      </div>
      <div className="flex">
        {/* Main content area */}
        <div className="p-2 mx-auto md:w-[78%]  ">
          {Object.keys(blog).length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <div key={blog.id} className="p-2 mb-8 rounded-lg">
              <div className="flex">
                <div className="mt-12">
                  {blog.title && (
                    <motion.div
                      variants={fadeIn("up", 0.2)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      <h2 className="mb-4 text-base font-bold text-center md:text-5xl ">
                        {blog.title}
                      </h2>
                    </motion.div>
                  )}

                  <div className="items-center mb-4 md:flex justify-evenly">
                    {blog.author && (
                      <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.5 }}
                      >
                        <p className="flex items-center justify-center">
                          <span className="text-base">Author:&nbsp;</span>
                          <span className="text-xl font-semibold">
                            {blog.author}
                          </span>
                        </p>
                      </motion.div>
                    )}
                    {blog.publishedDate && (
                      <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.5 }}
                      >
                        <p className="text-xl max-sm:hidden max-md:hidden lg:block">
                          |
                        </p>
                      </motion.div>
                    )}

                    {blog.publishedDate && (
                      <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.5 }}
                      >
                        <p className="flex items-center justify-center">
                          <span className="text-base">
                            Date of Publishing: &nbsp;
                          </span>
                          <span className="text-xl font-semibold">
                            {blog.publishedDate}
                          </span>
                        </p>
                      </motion.div>
                    )}
                  </div>
                  <motion.div
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                    className="m-2 divider divider-neutral "
                  ></motion.div>

                  <motion.div
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                    className=""
                  >
                    <p
                      style={{
                        wordBreak: "break-word",
                        margininsetBlockEnd: "20px",
                        lineblockSize: "1.6",
                        textIndent: "25px",
                      }}
                    >
                      <div
                        className="overflow-clip "
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                      />
                    </p>
                  </motion.div>
                  {blog.sections &&
                    blog.sections.map((section, index) => (
                      <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.5 }}
                        key={index}
                      >
                        {section.image && (
                          <>
                            {section.image && (
                              <div className="flex justify-center ">
                                <img
                                  src={section.image}
                                  alt={`Image ${index}`}
                                  className="object-scale-down w-[85%] h-full rounded"
                                />
                              </div>
                            )}
                            {section.imageTitle && (
                              <h2 className="mt-2 text-center">
                                {section.imageTitle}
                              </h2>
                            )}
                          </>
                        )}
                        {section.content && (
                          <div className="">
                            <p
                              style={{
                                wordBreak: "break-word",
                                margininsetBlockEnd: "20px",
                                lineblockSize: "1.6",
                              }}
                            >
                              <div
                                className="m-4"
                                dangerouslySetInnerHTML={{
                                  __html: section.content,
                                }}
                              />
                            </p>
                          </div>
                        )}
                        <div className=" max-md:w-[85%]">
                          <div className="max-sm:hidden md:hidden xl:block">
                            {section.tableData &&
                              section.tableData.length > 0 &&
                              renderTables(
                                section.tableData,
                                section.tableTitle
                              )}
                          </div>
                          <div className="sm:block md:block xl:hidden">
                            {section.tableData &&
                              section.tableData.length > 0 && (
                                <div>
                                  <h1 className="p-2 mt-10 text-center text-white bg-black">
                                    Open in desktop mode to view the table
                                  </h1>
                                </div>
                              )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  {blog.reference && (
                    <motion.div
                      variants={fadeIn("up", 0.2)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: false, amount: 0.5 }}
                      className=" max-sm:text-sm"
                    >
                      <h1 className="mb-4 text-2xl font-bold">Reference</h1>
                      <p
                        style={{
                          wordBreak: "break-word",
                          margininSetBlockEnd: "20px",
                          lineblockSize: "1.6",
                        }}
                      >
                        <div
                          className="p-2 m-2"
                          dangerouslySetInnerHTML={{ __html: blog.reference }}
                        />
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar area - Hidden on small screens */}
        <div className="sm:hidden max-sm:hidden lg:block  w-[calc(100%-80%)] mt-10">
          <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto w-full">
            <RecentPost />
          </div>
        </div>
      </div>

      {/* Move to Top Button */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-2 text-white bg-black rounded-full bottom-8 right-8 hover:bg-gray-700"
        >
          <BiUpArrowAlt className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default BlogDisplay;
