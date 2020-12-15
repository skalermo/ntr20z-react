import { NewTeacherForm } from './components/NewTeacherForm'

import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Teachers from "./components/Teachers";
import Activities from "./components/Activities";
// import Category from "./components/Category";

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//     <p>Home screen for School Scheduler</p>
//   </div>
// );

const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
);

class App extends Component {
  render() {

    return (
      <div class="col-xs-1" align="center" >
        < nav class="navbar navbar-expand-lg navbar-light bg-light" >
          <a class="navbar-brand" href="#">School Scheduler</a>
          <ul className="nav navbar-nav">
            <li>
              <Link class="nav-link" to="/">Home</Link>
            </li>
            <li>
              <Link class="nav-link" to="/teachers">Teachers</Link>
            </li>
            <li>
              <Link class="nav-link" to="/activities">Activities</Link>
            </li>
          </ul>
        </nav >

        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/teachers"><Teachers /></Route>
          <Route path="/activities"><Activities /></Route>
          <Route path="/:id">
            <p>This text will render for any route other than those defined above</p>
          </Route>
        </Switch>

      </div >
    );
  }
}

export default App;