import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./loginout.css";
import AuthWindow from "../../component/authWindow/authWindow";
import { http } from "../../config";

interface State {
  login_username: string;
  login_password: string;
  signup_username: string;
  signup_password: string;
  login_error_message: string;
  signup_error_message: string;
}

export default class Loginout extends React.Component<
  RouteChildrenProps,
  State
> {
  constructor(props: any) {
    super(props);
    this.state = {
      login_username: "",
      login_password: "",
      signup_username: "",
      signup_password: "",
      login_error_message: "",
      signup_error_message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: any, is_login: boolean) {
    event.preventDefault();

    const { login_username, login_password, signup_username, signup_password } =
      this.state;
    const {} = this.props.location;
    const url = http + "auth";


    let regEx = /^[0-9a-zA-Z]+$/;

    if (is_login) {
      if (login_username.length < 6 || login_password.length < 6) {
        this.setState({
          login_error_message:
            "username or password must be at least 6 characters",
        });
        return;
      }

      if (!login_username.match(regEx) || !login_password.match(regEx)){
        this.setState({
            login_error_message:
              "username or password cannot contain special characters",
          });
          return;
      }

      const credential = {
        is_login: true,
        username: login_username,
        password: login_password,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credential),
      })
        .then((res) => res.json())
        .then((res: any) => {
          console.log(res)
          if (res.exists) {
              localStorage.setItem("user_id", res.id)
              localStorage.setItem("username", res.username)
              this.props.history.push(`/user/${res.id}`)
          } else {
            this.setState({ login_error_message: "Username or password error" });
          }
        })
        .catch((error) => console.log(error));
    } else {
      if (signup_username.length < 6 || signup_password.length < 6) {
        this.setState({
          signup_error_message:
            "username or password must be at least 6 characters",
        });
        return;
      }

      if (!signup_username.match(regEx) || !signup_username.match(regEx)){
        this.setState({
            signup_error_message:
              "username or password cannot contain special characters",
          });
          return;
      }

      const credential = {
        is_login: false,
        username: signup_username,
        password: signup_password,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credential),
      })
        .then((res) => res.json())
        .then((res: any) => {
          console.log(res)
          if (res.exists) {
            localStorage.setItem("user_id", res.id)
            localStorage.setItem("username", res.username)
            this.props.history.push(`/user/${res.id}`)
          } else {
            this.setState({ signup_error_message: "Cannot create user" });
          }
        })
        .catch((error) => console.log(error));
    }
  }

  handleChange(type: string, value: string) {
    switch (type) {
      case "login_username":
        this.setState({ login_username: value });
        break;
      case "login_password":
        this.setState({ login_password: value });
        break;
      case "signup_username":
        this.setState({ signup_username: value });
        break;
      case "signup_password":
        this.setState({ signup_password: value });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      login_username,
      login_password,
      signup_username,
      signup_password,
      login_error_message,
      signup_error_message,
    } = this.state;
    return (
      <div className="container login-container">
        <div className="row login-row">
          <AuthWindow
            is_login={true}
            username={login_username}
            password={login_password}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error_message={login_error_message}
          />
          <AuthWindow
            is_login={false}
            username={signup_username}
            password={signup_password}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error_message={signup_error_message}
          />
        </div>
      </div>
    );
  }
}
