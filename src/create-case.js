import React from 'react';
import {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";

class CreateCase extends Component {
    componentDidMount(){

    }

    handleSubmit(event){
        event.preventDefault();

        fetch('https://localhost:44311/api/Cases', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 0,
                name: this.inputCaseName.value,
                ownerId: localStorage.userId,
            })
        }).then(response => {
            if(response.status === 201){
                response.json().then(response => {

                    }
                );

                window.location.href = '/case-created'
            }
            else{
                console.log(response);
                alert("Error with this great way of telling you that!");
            }
        })
    }

    render() {
        return (
            <div class="create-case">
                <h1>Thank you for signing up, {localStorage.getItem('firstName')}!</h1>
                <p>Now, let's create the case.</p>
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Case Name
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Case Name" inputRef={caseName => this.inputCaseName = caseName}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Child's First Name
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Child's First Name" inputRef={childsFirstName => this.inputChildsFirstName = childsFirstName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Child's Last Name
                        </Col>
                        <Col sm={10}>
                            <FormControl placeholder="Child's Last Name" inputRef={childsLastName => this.inputChildsLastName = childsLastName} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Create Case</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default CreateCase;