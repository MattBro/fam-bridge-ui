import React from 'react';
import {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

class Login extends Component {

    handleSubmit(event){
        event.preventDefault();
        console.log(process.env);
        console.log(process.env.REACT_APP_ROOT)

        fetch(process.env.REACT_APP_API.concat('api/Users/AuthenticateUser'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'mode':'cors'
            },
            body: JSON.stringify({
                email: this.inputEmail.value,
                password: this.inputPassword.value,
            })
        }).then(response => {
            if(response.status === 200){
                response.json().then(response => {
                        localStorage.setItem('userId', response['id']);
                        localStorage.setItem('sessionToken', response['token'])
                        localStorage.setItem('firstName', response['firstName'])
                    }
                );

                window.location.href = '/join-case'
            }
            else{
                console.log(response);
                alert("Error with this great way of telling you that!");
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Log in</h1>
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email"
                                         placeholder="Email"
                                         inputRef={email => this.inputEmail = email}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password"
                                         inputRef={email => this.inputPassword = email}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Login</Button>
                    </FormGroup>
                </Form>
                <Link to={'/signup'}><Button>Sign up</Button></Link>
            </div>

        )
    }
}

export default Login;