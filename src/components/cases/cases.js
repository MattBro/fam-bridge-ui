import React from 'react';
import {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import UserManager from "../../business/user-manager";

const REACT_APP_API = process.env.REACT_APP_API;
const REACT_APP_API_GET_CASE_RELATIONSHIPS = REACT_APP_API.concat('api/CaseRelationships/GetCaseRelationshipsForUser/')


class Cases extends Component{
    constructor(){
        super();
        this.state = {cases:[]}
    }

    componentDidMount() {
        function getUserName(userId, userName){
            UserManager().getUserFirstAndLastNameById(userId, userName)
        }

        function getCaseName(caseId){

        }

        function getOtherCaseParticipants(caseId){

        }

        fetch(REACT_APP_API_GET_CASE_RELATIONSHIPS.concat(localStorage.userId), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if(response.status === 200){
                response.json().then(response => {
                    response.forEach(caseRelationship =>{
                        if(!caseRelationship.hasOwnProperty("userId")){
                            throw Error;
                        }
                        let thisCase = {};
                        thisCase.name = getCaseName(caseRelationship.caseId);
                        let userName = '';
                        getUserName(caseRelationship.userId, userName);
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
                        thisCase = getOtherCaseParticipants(caseRelationship.caseId, thisCase);
                        this.state.cases.push(thisCase)
                    });
                    console.log(response);
                })
            }else{
                console.log(response);
                alert("(^.^)");
            }
        })



    }

    render(){


        return (<div>
            <h1>Your Cases</h1>
            <p>Listed below is the case or cases you are involved with.</p>
            <BootstrapTable data={this.state.cases} striped hover>
                <TableHeaderColumn isKey dataField='name'>Case Name</TableHeaderColumn>
                <TableHeaderColumn dataField='caseWorkerName'>Case Worker Name</TableHeaderColumn>
                <TableHeaderColumn dataField='fosterFamilyName'>Foster Family Member Name</TableHeaderColumn>
                <TableHeaderColumn dataField='birthFamilyName'>Birth Family Member Name</TableHeaderColumn>
            </BootstrapTable>
        </div>);
    }
}

export default Cases