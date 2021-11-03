import React, { Component } from "react";
import { BrowserRouter, Route, RouteChildrenProps } from "react-router-dom";
import "./App.css";
import NavBar from "./component/navbar/navbar";
import Home from "./view/home/home";
import Search from "./view/search/search"


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/course/:code" component={Search} />
          <Route path="/section/:id" component={Search} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
