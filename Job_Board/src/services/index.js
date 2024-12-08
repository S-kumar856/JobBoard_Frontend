const URL = 'http://localhost:4000/api'

export const registerService = (data) =>{
    return fetch(`${URL}/user/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
};

export const loginService = (data) =>{
    return fetch(`${URL}/user/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}