import { useParams, useNavigate } from "react-router-dom";
import PageCover from "../components/PageCover";
import RecentPost from "../components/RecentPost";
import { BiArrowBack } from "react-icons/bi";
import { useBlogContext } from "../context/BlogContext";

const BlogDisplay = () => {
  const { blogs, loading } = useBlogContext();
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) return <p>Blog not found</p>;

  const renderTables = (tables, tableTitles) => {
    return tables.map((table, tableIndex) => (
      <div key={tableIndex} className="m-4 overflow-x-auto">
        <table className="table table-zebra">
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

      <div className="p-2 mt-14 ">
        <PageCover blog={blog} />
      </div>
      <div className="flex">
        {/* Main content area */}
        <div className="p-6 mx-auto md:w-[75%] ">
          {Object.keys(blog).length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <div
              key={blog.id}
              className="p-2 mb-8 overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex">
                <div className="mt-12">
                  {blog.title && (
                    <h2 className="mb-4 text-base font-bold text-center md:text-5xl">
                      {blog.title}
                    </h2>
                  )}

                  <div className="items-center mb-4 md:flex justify-evenly">
                    {blog.author && (
                      <p className="flex items-center justify-center">
                        <span className="text-base">Author:&nbsp;</span>
                        <span className="text-xl font-semibold">
                          {blog.author}
                        </span>
                      </p>
                    )}
                    {blog.publishedDate && (
                      <p className="text-xl max-sm:hidden max-md:hidden lg:block">
                        |
                      </p>
                    )}

                    {blog.publishedDate && (
                      <p className="flex items-center justify-center">
                        <span className="text-base">
                          Date of Publishing: &nbsp;
                        </span>
                        <span className="text-xl font-semibold">
                          {blog.publishedDate}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="m-2 divider"></div>

                  <p
                    style={{
                      wordBreak: "break-word",
                      margininsetBlockEnd: "20px",
                      lineblockSize: "1.6",
                      textIndent: "25px",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                    />
                  </p>
                  {blog.sections &&
                    blog.sections.map((section, index) => (
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
                          <div className=" max-sm:text-sm">
                            <p
                              style={{
                                wordBreak: "break-word",
                                margininsetBlockEnd: "20px",
                                lineblockSize: "1.6",
                              }}
                            >
                              <div
                                className="p-2"
                                dangerouslySetInnerHTML={{
                                  __html: section.content,
                                }}
                              />
                            </p>
                          </div>
                        )}
                        {section.tableData &&
                          section.tableData.length > 0 &&
                          renderTables(section.tableData, section.tableTitle)}
                      </div>
                    ))}
                  {blog.reference && (
                    <div className=" max-sm:text-sm">
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar area - Hidden on small screens */}
        <div className="sm:hidden max-sm:hidden md:block lg:block  w-[calc(100%-75%)] mt-10">
          <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto w-full">
            <RecentPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDisplay;
