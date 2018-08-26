import React from 'react';
import {Component} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap"

class LoginOrSignup extends Component {
    render() {
        return (
            <div className="main">
                <Link to={'/login'}><Button>Log in</Button></Link>
                <Link to={'/signup'}><Button>Sign up</Button></Link>
            </div>
        )
    }
}

export default LoginOrSignup;