import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <button
            className="btn-small waves-effect waves-light #d32f2f red darken-2"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/signin");
            }}
          >
            SignOut
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to={"/signin"}>Signin</Link>
        </li>,
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>,
      ];
    }
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
