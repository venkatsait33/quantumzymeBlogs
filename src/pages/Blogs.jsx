import { Link } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";

const Blogs = () => {
  const { blogs, loading } = useBlogContext();

  if (loading) return <p>Loading...</p>;

  const limitDescription = (description, limit = 250) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  return (
    <div className="grid max-w-4xl grid-cols-1 gap-6 p-6 mx-auto mt-16 sm:grid-cols-2 lg:grid-cols-2">
      {blogs.length === 0 ? (
        <div className="mt-10 text-center block-center">
          <p className=" btn">No blogs available.</p>
        </div>
      ) : (
        blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className="mb-8">
            {blog && (
              <div className="w-full h-full transition duration-75 shadow-xl card bg-base-300 hover:scale-90">
                {blog.coverImage && (
                  <figure>
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="object-scale-down w-full h-40 p-2 "
                    />
                  </figure>
                )}

                <div className="flex flex-col justify-between card-body ">
                  <h2 className="text-lg font-bold card-title">{blog.title}</h2>
                  <div className="flex items-center justify-between mb-2 text-sm ">
                    <p>{blog.author}</p>
                    {blog.author && <p>|</p>}

                    <p>{blog.publishedDate}</p>
                  </div>
                  <p className="overflow-hidden text-ellipsis">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: limitDescription(blog.description),
                      }}
                    />
                  </p>
                  {blog.description && (
                    <p className="mt-2 font-semibold text-primary">Read More</p>
                  )}
                </div>
              </div>
            )}
          </Link>
        ))
      )}
    </div>
  );
};

export default Blogs;
