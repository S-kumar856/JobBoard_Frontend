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

// logout service
export const logoutService = () =>{
    return fetch(`${URL}/user/logout`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    })
}

//  backend service for job fetiching(reading data)
export const getJobsService = ( limit, offset, name) =>{
    return fetch(`${URL}/job?limit=${limit}&offset=${offset}&name=${name}`,{
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

export const updateJobService = (id, data) => {
    return fetch(`${URL}/job/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
};

export const getJobByIdService = (id) => {
    return fetch(`${URL}/job/${id}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
    })
}


//  backend service for delete 

export const deleteJobService = (id) => {
    return fetch(`${URL}/job/${id}`, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
    })
}