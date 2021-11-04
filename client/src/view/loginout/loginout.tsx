import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import "./loginout.css";
import AuthWindow from "../../component/authWindow/authWindow";

export default class Loginout extends React.Component<RouteChildrenProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="container login-container">
        <div className="row login-row">
          <AuthWindow is_login={true} />
          <AuthWindow is_login={false} />
        </div>
      </div>
    );
  }
}
