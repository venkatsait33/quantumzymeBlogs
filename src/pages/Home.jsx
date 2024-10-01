import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto">
      <div className="mt-20 space-x-10 text-center ">
        <Link to="/addBlog" className="m-2 btn btn-primary">
          Add a Blog
        </Link>
        <Link to="/blogs" className="m-2 btn btn-secondary">
          View Blogs
        </Link>
      </div>
    </div>
  );
};

export default Home;
