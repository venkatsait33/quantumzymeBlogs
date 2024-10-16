import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, key, limitDescription, handleBlogClick }) => {
  return (
    <Link
      to={`/blogs/${blog.id}`}
      key={key}
      className="mb-8"
      onClick={() => handleBlogClick(blog.id)}
    >
      {blog && (
        <div className="w-full h-full transition duration-180 delay-120 shadow-xl cease-in-out card bg-base-300 hover:-translate-y-1 hover:scale-90 hover:border-lime-300 hover:border-2 ">
          {blog.coverImage && (
            <figure>
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="object-cover w-full p-2 h-44 image-full"
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
            {limitDescription && (
              <p className="overflow-hidden text-ellipsis">
                <div
                  dangerouslySetInnerHTML={{
                    __html: limitDescription(
                      blog.coverText || blog.description
                    ),
                  }}
                />
              </p>
            )}

            {blog.description && blog.coverText && (
              <p className="mt-2 font-semibold text-primary">Read More</p>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};

export default BlogCard;
