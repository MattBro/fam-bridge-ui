import {Component} from "react";
import React from 'react';

const REACT_APP_API = process.env.REACT_APP_API;
const REACT_APP_API_GET_CASE_TOKENS_BY_TOKEN = REACT_APP_API.concat('api/CaseTokens/GetCaseTokenByToken/');
const REACT_APP_API_GET_CASE = REACT_APP_API.concat('api/Cases/');
const JOIN_CASE_TOKEN_KEY = 'joinCaseToken';


let JoinCaseRetriever = (ComposedComponent) => class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        let pathname = props.location.pathname;
        let tokenPrefix = '/join-case/token=';
        if(!pathname.includes(tokenPrefix)){
            return;
        }
        let token = pathname.replace(tokenPrefix,'');
        localStorage.setItem(JOIN_CASE_TOKEN_KEY,token)
    }

    componentDidMount(){

        let self = this;

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
                            getCase(response['caseId'], self);
                        }
                    );
                }
                else {
                    console.log(response);
                    alert("Error with this great way of telling you that!");
                }
            })
        }

        function getCase(caseId, self) {
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

    render(){
        return <ComposedComponent caseName={this.state.caseName}
                                  relationshipType={this.state.relationshipType}
                                  caseId={this.state.caseId}
        />
    }
};

export default JoinCaseRetriever