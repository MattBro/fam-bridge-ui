import React from 'react';
import {Component} from "react";
import UserManager from "../../business/user-manager";
import {getCaseRelationshipsByUserId} from "../../api/case-relationships";
import RelationshipType from '../../business/relationship-type';
import {getCaseById} from "../../api/case-api";

class CaseBuilder{
    caseName;
    fosterFamilyName;
    birthFamilyName;
    caseWorkerName;

    setCaseName(caseName){
        this.caseName = caseName;
    }

    setUserNameOnCaseBasedOnRelationshipToCase(caseRelationship, userName) {
        switch (caseRelationship.relationshipType) {
            case RelationshipType.FosterFamily:
                //foster family
                this.fosterFamilyName = userName;
                break;
            case RelationshipType.BirthFamily:
                //birth family
                this.birthFamilyName = userName;
                break;
            case RelationshipType.CaseWorker:
                //case worker
                this.caseWorkerName = userName;
        }
    }
    getCase(){
        return {caseName:this.caseName,
            fosterFamilyName:this.fosterFamilyName,
            birthFamilyName:this.birthFamilyName,
            caseWorkerName:this.caseWorkerName
        }
    }
}

let CasesRetriever = (ComposedComponent) => class extends Component{
    constructor() {
        super();
        this.state = { cases: [] };
    }

    componentDidMount() {
        this.getCasesForUserId(localStorage.userId);
        //this.setState({ cases: [{name:"The case name", caseWorkerName:"The case worker name", fosterFamilyName:"fosterFamilyName",birthFamilyName:"birthFamilyName"}] });
    }

    render(){
        return <ComposedComponent cases={this.state.cases}/>
    }

    getUserName(userId){
        return UserManager.getUserFirstAndLastNameById(userId)
    }

    getCaseName(caseId){
        return getCaseById(caseId).then(theCase => {

            console.log("CaseId: "+ caseId + "Got the case :", theCase);
            return theCase.name
        });
    }

    getOtherCaseParticipants(caseId){

    }

    getCasesForUserId(userId){
        getCaseRelationshipsByUserId(userId).then(response => {
            let cases = [];
            response.forEach(caseRelationship =>{
                if(!caseRelationship.hasOwnProperty("userId")){
                    throw Error;
                }
                let caseBuilder = new CaseBuilder();
                var caseBuilderPromises = [
                    this.getCaseName(caseRelationship.caseId)
                        .then(caseName => caseBuilder.setCaseName(caseName)),
                    this.getUserName(caseRelationship.userId)
                        .then(userName => caseBuilder.setUserNameOnCaseBasedOnRelationshipToCase(caseRelationship, userName)),
                    this.getOtherCaseParticipants(caseRelationship.caseId, caseBuilder)
                ]
                Promise.all(caseBuilderPromises).then(function(){cases.push(caseBuilder.getCase())});
            });
            this.setState(cases);
        })
    }


};

export default CasesRetriever