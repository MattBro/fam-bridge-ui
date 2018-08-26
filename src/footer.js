import React from 'react';
import {Component} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap"
import Main from "./main";

class Footer extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        Footer.signOut()
    }
    static signOut(){
        localStorage.clear()
    }
    render() {
        let isLoggedIn = localStorage.userId != null;
        if(isLoggedIn){
            return <Link to={'/'} onClick={this.handleClick}><Button>Sign Out</Button></Link>
        }else{
            return <Main />
        }
    }
}


export default Footer;