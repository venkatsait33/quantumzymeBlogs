import { Link } from "react-router-dom";
import noimage from "../assets/no-image.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Card = ({ blog, key, handleBlogClick, clicks }) => {
  return (
    <Link
      to={`/blogs/${blog.id}`}
      key={key}
      className="mb-8"
      onClick={() => handleBlogClick(blog.id)}
    >
      {blog && (
        <div className="w-[280px] m-2 shadow-md rounded-xl hover:border ">
          <figure className="h-[200px] w-full">
            <img
              src={blog.coverImage || noimage}
              alt={blog.title}
              className="object-scale-down w-full h-full p-2 rounded aspect-video "
            />
          </figure>

          <div className="flex flex-col justify-between h-full card-body ">
            <h2 className="text-base font-bold line-clamp-3">{blog.title}</h2>
            <div className="flex items-center justify-between mb-2 text-base ">
              <p>{blog.author}</p>
              {blog.author && <p>|</p>}

              <p>{blog.publishedDate}</p>
            </div>

            {blog.description && blog.coverText && (
              <p className="mt-2 font-semibold text-primary">Read More</p>
            )}
            {clicks && (
              <div className="">
                <p className="text-sm btn btn-sm btn-secondary text-end">
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

export default Card;
