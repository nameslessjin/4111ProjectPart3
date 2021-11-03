import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import './loginout.css'
export default class Loginout extends React.Component <RouteChildrenProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="container login-container">
                <div className="row login-row">
                    <div className="col-6">
                        <form className="login-form">
                            <h3>Login</h3>
                            <hr className="bar" />
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email" value="" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" value="" />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btnSubmit btn btn-secondary login-btn" value="Login" />
                            </div>
                        </form>                    
                    </div>
                    <div className="col-6">      
                        <form className="login-form">
                        <h3>Sign Up</h3>
                            <hr className="bar" />
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email" value="" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" value="" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password" value="" />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btnSubmit btn btn-secondary login-btn" value="Sign Up" />
                            </div>
                        </form>                        
                    </div>
                </div>
            </div>
        )
    }
}