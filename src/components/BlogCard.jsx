import { Link } from "react-router-dom";
import noimage from "../assets/no-image.jpg";

const BlogCard = ({ blog, limitDescription, handleBlogClick, clicks }) => {
  return (
    <Link
      to={`/blogs/${blog.id}`}
      key={blog.id}
      className="mb-8"
      onClick={() => handleBlogClick(blog.id)}
    >
      {blog && (
        <div className="w-full h-full transition duration-300 delay-300 shadow-xl cease-in-out card bg-base-300 hover:-translate-y-1 hover:scale-90 hover:border-lime-300 hover:border-2">
          <figure>
            <img
              src={blog.coverImage || noimage}
              alt={blog.title}
              className="object-cover w-full p-2 h-44 image-full"
            />
          </figure>

          <div className="flex flex-col justify-between card-body ">
            <h2 className="text-base font-bold card-title">{blog.title}</h2>
            <div className="flex items-center justify-between mb-2 text-base ">
              <p>{blog.author}</p>
              {blog.author && <p>|</p>}

              <p>{blog.publishedDate}</p>
            </div>
            {limitDescription && (
              <div className="overflow-hidden text-sm text-ellipsis">
                <div
                  dangerouslySetInnerHTML={{
                    __html: limitDescription(
                      blog.coverText || blog.description
                    ),
                  }}
                />
              </div>
            )}
            {blog.description && blog.coverText && (
              <p className="mt-2 font-semibold text-primary">Read More</p>
            )}
            {clicks && (
              <div className="">
                <p className="text-sm link link-primary text-end">
                  {clicks} {clicks === 1 ? "Click" : "Clicks"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};

export default BlogCard;
