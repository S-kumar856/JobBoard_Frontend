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

//  backend service for job fetiching(reading data)
export const getJobsService = () =>{
    return fetch(`${URL}/job`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    })
}


// backend service for creating a job data

export const crateJobService = (data) =>{
    return fetch(`${URL}/job`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
};

// backend service for update 

export const updateJob = (id, data) => {
    return fetch(`${URL}/job/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
};

export const getJobById = (id) => {
    return fetch(`${URL}/job/${id}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
    })

}