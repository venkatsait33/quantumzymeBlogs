import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <div className="mt-20 text-center ">
       
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
