import React from 'react';
import {Component} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap"

class SignOutButton extends Component {
    constructor(){
        super();
        SignOutButton.handleClick = SignOutButton.handleClick.bind(this);
    }
    static handleClick(){
        SignOutButton.signOut()
    }
    static signOut(){
        localStorage.clear()
    }
    render() {
        let isLoggedIn = localStorage.userId != null;
        if(isLoggedIn){
            return <Link to={'/'} onClick={SignOutButton.handleClick}><Button>Sign Out</Button></Link>
        }
        return <div></div>
    }
}


export default SignOutButton;