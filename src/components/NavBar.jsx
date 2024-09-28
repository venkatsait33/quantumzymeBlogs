import { Link } from "react-router-dom";
import logo from "../logo.png";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 z-10 navbar bg-base-100">
      <div className="flex-1 px-2 ">
        <Link to="/">
          <img
            src={logo}
            className="w-12 h-12 text-yellow-300 rounded-sm link link-hover"
            alt=""
          />
        </Link>
      </div>
      <div className="">
        <ul className="flex items-center justify-center px-1 menu menu-horizontal">
          <li>
            <details>
              <summary>About Us</summary>
              <ul className="p-2 rounded-t-none bg-base-100">
                <li>Vision</li>
                <li>Leadership</li>
                <li>Scientific Advisory Board</li>
                <li>Our Journey</li>
              </ul>
            </details>
          </li>
          <li>Technology</li>
          <li>
            <details>
              <summary>Services</summary>
              <ul className="p-2 rounded-t-none bg-base-100">
                <li>Enzyme discovery</li>
                <li>Enzyme Engineering</li>
                <li>Wet Lab Validation</li>
                <li>Process Development</li>
                <li>Scale-up</li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>R & D</summary>
              <ul className="p-2 rounded-t-none bg-base-100">
                <li>R&D Pipeline</li>
                <li>Publications</li>
                <li>Case Studies</li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Media</summary>
              <ul className="p-2 rounded-t-none bg-base-100">
                <li>In the News</li>
                <li>Company Statements</li>
                <li>Events</li>
              </ul>
            </details>
          </li>

          <li>Careers</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
