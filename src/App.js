import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import { Switch, Route, Link } from 'react-router-dom'
import Login from './login'
import Signup from './signup'
import Main from './main'
import CreateCase from "./create-case";
import CaseCreated from "./case-created";
import Footer from "./footer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to FamBridge</h1>
        </header>
          <Switch>
              {/*<Route exact path='/' component={Main}/>*/}
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/create-case' component={CreateCase}/>
              <Route path='/case-created' component={CaseCreated}/>
          </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
