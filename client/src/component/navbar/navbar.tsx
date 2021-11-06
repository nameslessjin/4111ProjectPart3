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
        <a href="/auth">
            <h2>Login/Signup</h2>
        </a>
      </div>
    );
  }
}

export default NavBar;
