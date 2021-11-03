import React from "react";
// import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <a href="/">
          <h2>Course Finder</h2>
        </a>
        {/* <Link to="/">Current Tasks</Link>
        <Link to="/completed">Completed Tasks</Link> */}
      </div>
    );
  }
}

export default NavBar;
