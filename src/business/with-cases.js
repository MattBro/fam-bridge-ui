import React from 'react';
import {Component} from "react";
import UserManager from "./user-manager";
import CaseRelationships from "../api/case-relationships";

let WithCases = (ComposedComponent) => class extends Component{
    constructor() {
        super();
        this.state = { cases: [] };
    }

    componentDidMount() {
        this.setState({ cases: [{name:"The case name", caseWorkerName:"The case worker name", fosterFamilyName:"fosterFamilyName",birthFamilyName:"birthFamilyName"}] });
    }

    render(){
        return <ComposedComponent cases={this.state.cases}/>
    }

    getCasesForUserId(userId) {
        return new Promise(function (resolve) {
            resolve(WithCases._getCasesForUserId(userId))
        });
    }

    _getUserName(userId, userName){
        UserManager.getUserFirstAndLastNameById(userId, userName)
    }

    _getCaseName(caseId){

    }

    _getOtherCaseParticipants(caseId){

    }

    _getCasesForUserId(userId){
        CaseRelationships.getCaseRelationshipsByUserId(userId).then(response => {
            let cases = [];
            response.forEach(caseRelationship =>{
                if(!caseRelationship.hasOwnProperty("userId")){
                    throw Error;
                }
                let thisCase = {};
                thisCase.name = this._getCaseName(caseRelationship.caseId);
                let userName = '';
                this._getUserName(caseRelationship.userId, userName);
                switch (caseRelationship.relationshipType) {
                    case 0:
                        //foster family
                        thisCase.fosterFamilyName = userName;
                        break;
                    case 1:
                        //birth family
                        thisCase.birthFamilyName = userName;
                        break;
                    case 2:
                        //case worker
                        thisCase.caseWorkerName = userName;
                }
                thisCase = this._getOtherCaseParticipants(caseRelationship.caseId, thisCase);
                cases.push(thisCase);

            });
        })
    }
};

export default WithCases