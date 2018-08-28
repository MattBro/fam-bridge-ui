import React from 'react';
import {Component} from "react";
import {Form, FormControl, FormGroup, HelpBlock, ControlLabel, Button, Col, ButtonGroup} from "react-bootstrap"
import {Link} from "react-router-dom";
const REACT_APP_API = process.env.REACT_APP_API;
const uuidv1 = require('uuid/v1');

class Signup extends Component {
    constructor(props,context){
        super(props,context);
        this.isCaseWorker = false;
    }

    handleSubmit(event){
        event.preventDefault();
        this.token = uuidv1();

        fetch(REACT_APP_API.concat('api/Users'), {
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

                if(this.isCaseWorker)
                    window.location.href = '/create-case'
                else
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
            <div className="signup">
                <h1>Sign up</h1>
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
                        <Col componentClass={ControlLabel} sm={2}>
                            Are you a case worker?
                        </Col>

                    <ButtonGroup>
                        <Button onClick={()=>this.isCaseWorker=true}>Yes</Button>
                        <Button onClick={()=>this.isCaseWorker=false}>No</Button>
                    </ButtonGroup>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Sign up</Button>
                    </FormGroup>
                </Form>
                <Link to={'/login'}><Button>Log in</Button></Link>
            </div>
        )
    }
}

export default Signup;