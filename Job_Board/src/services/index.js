const URL = 'http://localhost:4000/api'

//  backend service for user register
export const registerService = (data) =>{
    return fetch(`${URL}/user/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
};

// backend service for user login
export const loginService = (data) =>{
    return fetch(`${URL}/user/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
};

//  backend service for job fetiching
export const getJobsService = () =>{
    return fetch(`${URL}/job`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    })
}