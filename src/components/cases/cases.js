import React from 'react';
import {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import CasesRetriever from "./cases-retriever.js"


class Cases extends Component{
    render(){
        return (<div>
            <h1>Your Cases</h1>
            <p>Listed below is the case or cases you are involved with.</p>
            <BootstrapTable data={this.props.cases} striped hover>
                <TableHeaderColumn isKey dataField='name'>Case Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='caseWorkerName'>Case Worker Name</TableHeaderColumn>
                <TableHeaderColumn dataField='fosterFamilyName'>Foster Family Member Name</TableHeaderColumn>
                <TableHeaderColumn dataField='birthFamilyName'>Birth Family Member Name</TableHeaderColumn>
            </BootstrapTable>
        </div>);
    }
}

export default CasesRetriever(Cases)