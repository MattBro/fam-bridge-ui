import React from 'react';
import {Component} from "react";
import {Form, FormControl, FormGroup, HelpBlock, ControlLabel, Button, Col} from "react-bootstrap"

const uuidv1 = require('uuid/v1');

class Signup extends Component {
    constructor(props,context){
        super(props,context)
    }

    handleSubmit(event){
        event.preventDefault();
        this.token = uuidv1();

        fetch('https://localhost:44311/api/Users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 0,
                email: this.inputEmail.value,
                password: this.inputPassword.value,
                token: this.token,
                lastName: this.inputLastName.value,
                firstName: this.inputFirstName.value
            })
        }).then(response => {
            if(response.status === 201){
                response.json().then(response => {
                        localStorage.setItem('userId', response['id']);
                    }
                );
                localStorage.setItem('firstName',this.inputFirstName.value);
                localStorage.setItem('sessionToken', this.token);
                localStorage.setItem('userId',response.json().valueOf()['id']);

                window.location.href = '/create-case'
            }
            else{
                console.log(response);
                alert("Error with this great way of telling you that!");
            }
        })
    }

    render() {
        return (
            <div className="signup">
                <h1>Sign Up</h1>
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            First Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="firstName" placeholder="First Name" inputRef={email => this.inputFirstName = email}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Last Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="lastName" placeholder="Last Name" inputRef={email => this.inputLastName = email} />
                        </Col>
                    </FormGroup>
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
                            <FormControl type="password" placeholder="Password" inputRef={email => this.inputPassword = email} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Sign up</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Signup;