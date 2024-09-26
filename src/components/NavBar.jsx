import React from "react";

const NavBar = () => {
  return (
    <div className="navbar fixed top-0 left-0 bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Logo</a>
      </div>
      <div className="">
        <ul className="menu menu-horizontal flex justify-center items-center px-1">
          <li>
            <details>
              <summary>About Us</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
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
              <ul className="bg-base-100 rounded-t-none p-2">
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
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>R&D Pipeline</li>
                <li>Publications</li>
                <li>Case Studies</li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Media</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
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
