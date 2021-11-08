import React from "react";
// import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  signout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
  };

  render() {
    return (
      <div className="navbar">
        <a href="/">
          <h2>Course Finder</h2>
        </a>
        {localStorage.getItem("user_id") ? (
          <a href={`/user/${localStorage.getItem("user_id")}`}>
            <h2>{localStorage.getItem("username")}</h2>
          </a>
        ) : null}
        {localStorage.getItem("user_id") ? (
          <a href={`/auth`} onClick={this.signout}>
            <h2>Sign out</h2>
          </a>
        ) : (
          <a href="/auth">
            <h2>Login/Signup</h2>
          </a>
        )}
      </div>
    );
  }
}

export default NavBar;
