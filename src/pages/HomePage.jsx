import { Link } from "react-router-dom";
import CarouselImages from "../components/CarouselImages";
import HomeCover from "../components/HomeCover";
import Blogs from "./Blogs";
import { useAuth } from "../context/AuthContext";
import StickyBlogs from "../components/StickyBlogs";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

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

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        <h1 className="mt-3 text-xl font-bold text-center underline">
          Popular Blogs
        </h1>
        <CarouselImages />
      </motion.div>

      <div className="flex gap-3 mt-8 ">
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="block max-sm:hidden lg:mt-10  max-lg:hidden w-[calc(100%-50%)] "
        >
          <div className="">
            <StickyBlogs />
          </div>
        </motion.div>
        <div className="lg:sticky lg:mt-10 lg:scroll-smooth lg:max-h-[calc(1900px-20px)] lg:overflow-y-scroll w-full max-sm:w-[100%] max-lg:w-[100%] lg:scrollbar-hide ">
          <Blogs />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
