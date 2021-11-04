import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./loginout.css";
import AuthWindow from "../../component/authWindow/authWindow";
import { http } from "../../config";

interface State {
  login_email: string;
  login_password: string;
  signup_email: string;
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
      login_email: "",
      login_password: "",
      signup_email: "",
      signup_password: "",
      login_error_message: "",
      signup_error_message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: any, is_login: boolean) {
    event.preventDefault();

    const { login_email, login_password, signup_email, signup_password } =
      this.state;
    const {} = this.props.location;
    if (is_login) {
      if (login_email.length < 6 || login_password.length < 6) {
        this.setState({
          login_error_message:
            "Email or password must be at least 6 characters",
        });
        return;
      }

      const credential = {
        is_login: true,
        email: login_email,
        password: login_password,
      };

      const url = http + "auth";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credential),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .then((error) => console.log(error));

        
    } else {
      if (signup_email.length < 6 || signup_password.length < 6) {
        this.setState({
          login_error_message:
            "Email or password must be at least 6 characters",
        });
        return;
      }
    }
  }

  handleChange(type: string, value: string) {
    switch (type) {
      case "login_email":
        this.setState({ login_email: value });
        break;
      case "login_password":
        this.setState({ login_password: value });
        break;
      case "signup_email":
        this.setState({ signup_email: value });
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
      login_email,
      login_password,
      signup_email,
      signup_password,
      login_error_message,
      signup_error_message,
    } = this.state;
    return (
      <div className="container login-container">
        <div className="row login-row">
          <AuthWindow
            is_login={true}
            email={login_email}
            password={login_password}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error_message={login_error_message}
          />
          <AuthWindow
            is_login={false}
            email={signup_email}
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
