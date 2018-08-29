const REACT_APP_API = process.env.REACT_APP_API;
const REACT_APP_API_GET_CASE_RELATIONSHIPS = REACT_APP_API.concat('api/CaseRelationships/GetCaseRelationshipsForUser/');
const REACT_APP_API_CASE_RELATIONSHIP = REACT_APP_API.concat('api/CaseRelationships/');

export const getCaseById = (caseId) => {
    return fetch(REACT_APP_API_GET_CASE_RELATIONSHIPS.concat(caseId), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
    });
};

export const joinCase = (caseId, userId, relationshipType) => {
    return fetch(REACT_APP_API_CASE_RELATIONSHIP,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "caseId": caseId,
            "userId": userId,
            "relationshipType": relationshipType
        })
    });
};