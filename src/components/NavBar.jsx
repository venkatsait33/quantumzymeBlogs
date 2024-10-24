import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  {
    <div>
      <div className=" menu horizontal">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="garden" />

          {/* sun icon */}
          <svg
            className="w-8 h-8 fill-current swap-off"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="w-8 h-8 fill-current swap-on"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>;
  }

  return (
    <div className="fixed top-0 left-0 z-10 flex gap-2 bg-black rounded-b navbar max-sm:h-14">
      <div className="max-sm:flex-1 ">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost md:hidden sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 shadow menu dropdown-content bg-base-100 rounded-box "
          >
            <li className="">
              <details>
                <summary className="sm:text-sm">About Us</summary>
                <ul className="p-2 space-y-2 rounded-t-none w-44 bg-base-100">
                  <li className=" link link-hover sm:text-sm">Vision</li>
                  <li className="link link-hover sm:text-sm">Leadership</li>
                  <li className="link link-hover sm:text-sm">
                    Scientific Advisory Board
                  </li>
                  <li className="link link-hover sm:text-sm">Our Journey</li>
                </ul>
              </details>
            </li>
            <li>
              <summary className="link link-hover sm:text-sm">
                Technology
              </summary>
            </li>

            <li>
              <details className="">
                <summary className="sm:text-sm">Services</summary>
                <ul className="p-2 space-y-2 rounded-t-none bg-base-100">
                  <li className="link link-hover sm:text-sm">
                    Enzyme discovery
                  </li>
                  <li className="link link-hover sm:text-sm">
                    Enzyme Engineering
                  </li>
                  <li className="link link-hover sm:text-sm">
                    Wet Lab Validation
                  </li>
                  <li className="link link-hover sm:text-sm">
                    Process Development
                  </li>
                  <li className="link link-hover sm:text-sm">Scale-up</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className="sm:text-sm">R & D</summary>
                <ul className="p-2 space-y-2 rounded-t-none bg-base-100">
                  <li className="link link-hover sm:text-sm">R&D Pipeline</li>
                  <li className="link link-hover sm:text-sm">Publications</li>
                  <li className="link link-hover sm:text-sm">Case Studies</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className="sm:text-sm">Media</summary>
                <ul className="p-2 space-y-2 rounded-t-none bg-base-100">
                  <li className="link link-hover sm:text-sm">In the News</li>
                  <li className="link link-hover sm:text-sm">
                    Company Statements
                  </li>
                  <li className="link link-hover sm:text-sm">Events</li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-2 max-sm:navbar lg:flex-1 menu menu-horizontal ">
        <Link to="/">
          <img
            src={logo}
            className="h-12 text-white max-sm:w-12 md:w-14 lg:w-16"
            alt=""
          />
        </Link>
      </div>

      <div className=" max-sm:hidden menu menu-horizontal navbar-center lg:flex">
        <ul className="flex items-center justify-center gap-2 px-1 menu menu-horizontal">
          <li>
            <details>
              <summary className="sm:text-sm">About Us</summary>
              <ul className="p-2 space-y-2 rounded-t-none bg-base-100">
                <li className=" link link-hover sm:text-sm">Vision</li>
                <li className="link link-hover sm:text-sm">Leadership</li>
                <li className="link link-hover sm:text-sm">
                  Scientific Advisory Board
                </li>
                <li className="link link-hover sm:text-sm">Our Journey</li>
              </ul>
            </details>
          </li>
          <li className="link link-hover sm:text-sm">Technology</li>
          <li>
            <details className="">
              <summary className="sm:text-sm">Services</summary>
              <ul className="p-2 space-y-2 rounded-t-none bg-base-100">
                <li className="link link-hover sm:text-sm">Enzyme discovery</li>
                <li className="link link-hover sm:text-sm">
                  Enzyme Engineering
                </li>
                <li className="link link-hover sm:text-sm">
                  Wet Lab Validation
                </li>
                <li className="link link-hover sm:text-sm">
                  Process Development
                </li>
                <li className="link link-hover sm:text-sm">Scale-up</li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className="sm:text-sm">R & D</summary>
              <ul className="p-2 space-y-2 rounded-t-none bg-base-100">
                <li className="link link-hover sm:text-sm">R&D Pipeline</li>
                <li className="link link-hover sm:text-sm">Publications</li>
                <li className="link link-hover sm:text-sm">Case Studies</li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className="sm:text-sm">Media</summary>
              <ul className="p-2 space-y-2 rounded-t-none bg-base-100">
                <li className="link link-hover sm:text-sm">In the News</li>
                <li className="link link-hover sm:text-sm">
                  Company Statements
                </li>
                <li className="link link-hover sm:text-sm">Events</li>
              </ul>
            </details>
          </li>

          <li className="link link-hover">Careers</li>
        </ul>
      </div>
      <div className="menu menu-horizontal">
        {user ? (
          <div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 rounded-full">
                  <img alt="user name" src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <h2 className="justify-between">{user.displayName}</h2>
                </li>
                <li>
                  <Link to="/userBlogs">Blogs</Link>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login" className=" btn btn-sm hover:btn-outline">
              login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
