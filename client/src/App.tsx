import React, { Component } from "react";
import { BrowserRouter, Route, RouteChildrenProps } from "react-router-dom";
import "./App.css";
import NavBar from "./component/navbar/navbar";
import Home from "./view/home/home";
import Search from "./view/search/search"
import Section from './view/section/section'
import Course from './view/course/course'
import Auth from './view/loginout/loginout'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route path="/search" component={Search} />
          <Route path="/course/:code" component={Course} />
          <Route path="/section/:id" component={Section} />
          <Route path="/user/:id" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
