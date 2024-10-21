import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto">
      <div className="mt-20 space-x-10 text-center ">
        <Link to="/addBlog" className="m-2 btn btn-primary">
          Add a Blog
        </Link>
        <Link to="/blogPages" className="m-2 btn btn-secondary">
          View Blogs
        </Link>
        <Link to="/home" className="m-2 btn btn-secondary">
          HomePage
        </Link>
      </div>
    </div>
  );
};

export default Home;
