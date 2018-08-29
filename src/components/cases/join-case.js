import React from 'react';
import {Component} from "react";
import {Redirect} from "react-router-dom";
import {joinCase} from "../../api/case-api";
import JoinCaseRetriever from "./join-case-retriever";

class JoinCase extends Component {

    constructor(props){
        super(props);
        this.state={goToCases: false};
    }

    render() {
        if(this.state.goToCases){
            return <Redirect to={'/cases'} />
        }
        let isLoggedIn = localStorage.userId != null;
        if(!isLoggedIn){
            return <Redirect to={'/welcome'} />
        }

        return (
            <div className='join-case'>
                <h1>Join Case</h1>
                <p>You were invited to join the case named <b>{this.props.caseName}</b></p>
                <button onClick={()=> this._joinCase(this.props.caseId, localStorage.userId, this.props.relationshipType)}>Join Case</button>
            </div>
        );
    }

    _joinCase(caseId, userId, relationshipType){
        let self = this;
        joinCase(caseId, userId, relationshipType).then(response =>{
            if (response.status === 201) {
                self.setState({goToCases:true})
            }
            else {
                console.log(response);
                alert("Error with this great way of telling you that!");
            }
        })
    }

}

export default JoinCaseRetriever(JoinCase)

