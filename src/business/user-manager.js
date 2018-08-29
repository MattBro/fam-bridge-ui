const REACT_APP_API_GET_USER = process.env.REACT_APP_API.concat('api/Users/');

class UserManager{
    static getUserFirstAndLastNameById = function(userId){
        return fetch(REACT_APP_API_GET_USER.concat(userId), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response =>{
            if(response.status === 200){
                response.json().then(response => {
                    return response['firstName'].concat(' ').concat(response['lastName']);
                })
            }
        })

    }
}

export default UserManager