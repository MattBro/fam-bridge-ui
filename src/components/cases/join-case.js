import React from 'react';
import {Component} from "react";
import {Redirect} from "react-router-dom";

const REACT_APP_API = process.env.REACT_APP_API;
const REACT_APP_API_GET_CASE_TOKENS_BY_TOKEN = REACT_APP_API.concat('api/CaseTokens/GetCaseTokenByToken/');
const REACT_APP_API_GET_CASE = REACT_APP_API.concat('api/CasesCoordinator/');
const REACT_APP_API_CASE_RELATIONSHIP = REACT_APP_API.concat('api/CaseRelationships/');
const JOIN_CASE_TOKEN_KEY = 'joinCaseToken';

class JoinCase extends Component {
    constructor(props) {
        super(props);
        this.state = {'caseName':'', goToCases:false}
        let pathname = props.location.pathname;
        let tokenPrefix = '/join-case/token=';
        if(!pathname.includes(tokenPrefix)){
            return;
        }
        let token = pathname.replace(tokenPrefix,'');
        localStorage.setItem(JOIN_CASE_TOKEN_KEY,token)
    }

    componentDidMount(){

        var self = this;

        getCaseId();
        function getCaseId() {
            return fetch(REACT_APP_API_GET_CASE_TOKENS_BY_TOKEN.concat(localStorage.getItem(JOIN_CASE_TOKEN_KEY)), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(response => {
                            self.setState({'relationshipType':response['relationshipType']});
                            getCase(response['caseId']);
                        }
                    );
                }
                else {
                    console.log(response);
                    alert("Error with this great way of telling you that!");
                }
            })
        }

        function getCase(caseId) {
            fetch(REACT_APP_API_GET_CASE.concat(caseId), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (response.status === 200) {
                    return response.json().then(response => {
                        self.setState({'caseName':response['name'], 'caseId':response['id']})
                    })
                }
                else{
                    throw Error(response.toString())
                }
            });
        }
    }



    render() {
        if(this.state.goToCases){
            return <Redirect to={'/cases'} />
        }
        let isLoggedIn = localStorage.userId != null;
        if(!isLoggedIn){
            return <Redirect to={'/welcome'} />
        }

        var self = this;

        return (
        <div className='join-case'>
            <h1>Join Case</h1>
            <p>You were invited to join the case named <b>{this.state.caseName}</b></p>
            <button onClick={joinCase}>Join Case</button>
        </div>
        );

        function joinCase(){
            fetch(REACT_APP_API_CASE_RELATIONSHIP,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "caseId": self.state.caseId,
                    "userId": localStorage.userId,
                    "relationshipType": self.state.relationshipType
                })
            }).then(response => {
                if (response.status === 201) {
                    self.setState({goToCases:true})
                }
                else {
                    console.log(response);
                    alert("Error with this great way of telling you that!");
                }
            });
        }
    }
}

export default JoinCase

