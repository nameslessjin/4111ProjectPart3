import React from "react";
import PropTypes from "prop-types";

export interface AuthWindowProps {
  is_login: boolean;
}

export default class AuthWindow extends React.Component<AuthWindowProps> {
  static defaultProps = {
    is_login: true,
  };

  static propTypes = {
    is_login: PropTypes.bool,
  };

  render() {
    const { is_login } = this.props;

    return (
      <div className="col-6">
        <form className="login-form">
          <h3>{is_login ? "Login" : "Sign Up"}</h3>
          <hr className="bar" />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value=""
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value=""
            />
          </div>
          {/* {!is_login ? (
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value=""
              />
            </div>
          ) : null} */}
          <div className="form-group">
            <input
              type="submit"
              className="btnSubmit btn btn-secondary login-btn"
              value="Login"
            />
          </div>
        </form>
      </div>
    );
  }
}
