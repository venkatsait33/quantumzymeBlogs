import { Link } from "react-router-dom";
import CarouselImages from "../components/CarouselImages";
import HomeCover from "../components/HomeCover";
import Blogs from "./Blogs";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mt-10">
        <HomeCover />
      </div>
      <div className="max-w-xl ">
        <Link to="/addBlog" className="w-full btn btn-primary">
          Create a New Blog
        </Link>
      </div>
      <div>
        <h1 className="mt-3 text-xl font-bold text-center underline">
          Popular Blogs
        </h1>
        <CarouselImages />
      </div>

      <div className="mt-4">
        <Blogs />
      </div>
    </div>
  );
};

export default HomePage;
