import React from "react";
import PropTypes from "prop-types";

export interface AuthWindowProps {
  is_login: boolean;
  username: string;
  password: string;
  error_message: string;
  handleChange: (type: string, value: string) => void;
  handleSubmit: (event: any, is_login: boolean) => void
}

export default class AuthWindow extends React.Component<AuthWindowProps> {
  static defaultProps = {
    is_login: true,
    username: "",
    password: "",
    error_message: "",
    handleChange: (type: string, value: string) => null,
    handleSubmit: (event: any, is_login: boolean) => null
  };

  static propTypes = {
    is_login: PropTypes.bool,
    handleChange: PropTypes.func,
    username: PropTypes.string,
    password: PropTypes.string,
    error_message: PropTypes.string,
    handleSubmit: PropTypes.func
  };

  render() {
    const { is_login, handleChange, username, password, error_message, handleSubmit } = this.props;

    return (
      <div className="col-6">
        <form className="login-form" onSubmit={event => handleSubmit(event, is_login)}>
          <h3>{is_login ? "Login" : "Sign Up"}</h3>
          <hr className="bar" />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={username}
              onChange={(event) =>
                handleChange(
                  is_login ? "login_username" : "signup_username",
                  event.target.value
                )
              }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(event) =>
                handleChange(
                  is_login ? "login_password" : "signup_password",
                  event.target.value
                )
              }
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
              value= {is_login ? "Login" : "Sign Up"}
            />
          </div>
          <div>
              <p>{error_message}</p>
          </div>
        </form>
      </div>
    );
  }
}
