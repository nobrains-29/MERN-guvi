import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const renderList = () => {
    return [
      <li>
        <Link to={"/signin"}>Signin</Link>
      </li>,
      <li>
        <Link to={"/signup"}>Signup</Link>
      </li>,
      <li>
        <button
          className="btn-small waves-effect waves-light #d32f2f red darken-2"
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
        >
          SignOut
        </button>
      </li>,
    ];
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
