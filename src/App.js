import React, { Component } from 'react';
import logo from './golden-gate.bmp';
import './css/App.css';
import { Switch, Route, Link } from 'react-router-dom'
import Login from './components/authorization/login'
import Signup from './components/authorization/signup'
import CreateCase from "./components/cases/create-case";
import CaseCreated from "./components/cases/case-created";
import SignOutButton from "./components/authorization/sign-out-button";
import Cases from "./components/cases/cases"
import JoinCase from "./components/cases/join-case"
import LoginOrSignup from "./components/authorization/login-or-signup";

class App extends Component {
  render() {
    return (
      <div className="App">
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to FamBridge</h1>
        </header>
          <Switch>
              <Route path='/' exact component={LoginOrSignup}/>
              <Route path='/welcome' component={LoginOrSignup}/>
              <Route path='/join-case' component={JoinCase}/>
              <Route path='/cases' component={Cases}/>
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/create-case' component={CreateCase}/>
              <Route path='/case-created' component={CaseCreated}/>
          </Switch>
        <SignOutButton/>
      </div>
    );
  }
}

export default App;
