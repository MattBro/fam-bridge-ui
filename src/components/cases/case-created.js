import React from 'react';
import {Component} from "react";
import RelationshipType from "../../business/relationship-type"
import {Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";

const uuid = require('uuid');
const REACT_APP_ROOT = process.env.REACT_APP_ROOT;
const joinLink = REACT_APP_ROOT.concat('join-case/token=');

class CaseCreated extends Component {
    constructor() {
        super();
        this.state = {};
        this.setState({birthFamilyLink: '', fosterFamilyLink: ''})
    }

    componentDidMount() {

        this.birthFamilyToken = uuid.v4();
        let newBirthFamilyLink = joinLink.concat(this.birthFamilyToken);
        this.setState({birthFamilyLink: newBirthFamilyLink});
        this.createCaseToken(RelationshipType.BirthFamily, this.birthFamilyToken);

        this.fosterFamilyToken = uuid.v4();
        let newFosterFamilyLink = joinLink.concat(this.fosterFamilyToken);
        this.setState({fosterFamilyLink: newFosterFamilyLink});

        this.createCaseToken(RelationshipType.FosterFamily, this.fosterFamilyToken);
    }

    createCaseToken(relationshipType, token) {
        fetch(process.env.REACT_APP_API.concat('api/CaseTokens'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                caseId: localStorage.caseId,
                relationshipType: relationshipType,
                token: token
            })
        }).then(response => {
            if (response.status === 201) {

            }
            else {
                console.log(response);
                alert("Error with this great way of telling you that!");
            }
        })
    }

    render() {
        return (
            <div className='case-created'>
                <h1>Case Created</h1>
                <p>To get started, send the birth family and foster family their respective links.</p>

                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Birth Family Link
                        </Col>
                        <Col sm={10}>
                            <FormControl readonly type='text' placeholder="Generating Link"
                                         value={this.state.birthFamilyLink}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Foster Family Link
                        </Col>
                        <Col sm={10}>
                            <FormControl readonly type='text' placeholder="Generating Link"
                                         value={this.state.fosterFamilyLink}/>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default CaseCreated;