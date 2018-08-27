import React from 'react';
import {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {Button} from "react-bootstrap"

class LoginOrSignup extends Component {
    render() {
        let isLoggedIn = localStorage.userId != null;
        if(isLoggedIn){
            return < Redirect to={'./cases'} />
        }

        return (
            <div className="main">
                <Link to={'/login'}><Button bsStyle="link">Log in</Button></Link>
                <Link to={'/signup'}><Button bsStyle="link">Sign up</Button></Link>
            </div>
        )
    }
}

export default LoginOrSignup;