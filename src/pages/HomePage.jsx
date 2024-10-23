import { Link } from "react-router-dom";
import CarouselImages from "../components/CarouselImages";
import HomeCover from "../components/HomeCover";
import Blogs from "./Blogs";
import { useAuth } from "../context/AuthContext";
import StickyBlogs from "../components/StickyBlogs";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mt-16">
        <HomeCover />
      </div>
      {user && (
        <div className="max-w-xl mt-2">
          <Link to="/addBlog" className="w-full text-white btn">
            Create a New Blog
          </Link>
        </div>
      )}

      <div>
        <h1 className="mt-3 text-xl font-bold text-center underline">
          Popular Blogs
        </h1>
        <CarouselImages />
      </div>

      <div className="flex mt-8">
        <div className="block max-sm:hidden max-lg:hidden w-4/4">
          <StickyBlogs />
        </div>
        <Blogs />
      </div>
    </div>
  );
};

export default HomePage;
