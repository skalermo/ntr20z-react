
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Teachers from "./components/Teachers";
import TeacherForm from "./components/TeacherForm";
import Activities from "./components/Activities";

const Header = () => {
  return (
    <header>
      <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div class="container">
          <div class="navbar-brand">School Scheduler</div>
          <ul class="nav navbar-nav">
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
        </div>
      </nav >
    </header>
  )
}

class App extends Component {
  render() {

    return (
      <div>
        <Header />

        <div class="container">
          <main role="main" class="pb-3">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path="/teachers"><Teachers /></Route>
              <Route path="/teacherForm"><TeacherForm /></Route>
              <Route path="/activities"><Activities /></Route>
              <Route path="/:id">
                <p>This text will render for any route other than those defined above</p>
              </Route>
            </Switch>
          </main>
        </div>

      </div >
    );
  }
}

export default App;