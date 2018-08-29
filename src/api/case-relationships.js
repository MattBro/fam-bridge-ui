const REACT_APP_API = process.env.REACT_APP_API;
const REACT_APP_API_GET_CASE_RELATIONSHIPS = REACT_APP_API.concat('api/CaseRelationships/GetCaseRelationshipsForUser/');

class CaseRelationships {
    static getCaseRelationshipsByUserId(userId){
        return fetch(REACT_APP_API_GET_CASE_RELATIONSHIPS.concat(userId), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(response => {

                });
            }
        });
    }
}

export default CaseRelationships