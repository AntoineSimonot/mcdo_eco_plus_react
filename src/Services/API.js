let baseUrl = 'http://127.0.0.1:3000'

export const getToken = () => {
    return localStorage.getItem('token')
}

export const loginUser = async ({ email, password }) => {

    let response = await fetch(`${baseUrl}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })

    let json = await response.json()

    return json
}

export const loginTerminal = async ({ serial }) => {

    let response = await fetch(`${baseUrl}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            serial: serial,
        })
    })

    let json = await response.json()

    return json
}

// me
export const me = async () => {
    
    let response = await fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })

    let json = await response.json()

    return json
    
}
