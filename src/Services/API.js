let baseUrl = 'http://127.0.0.1:3000'

export const getToken = () => {
    if (localStorage.getItem('token')) return localStorage.getItem('token')
    if (localStorage.getItem('terminalToken')) return localStorage.getItem('terminalToken')

    return null
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

export const getProducts = async () => {
    
    let response = await fetch(`${baseUrl}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })

    let json = await response.json()

    return json
    
}

export const postOrder = async (products, price) => {
    let response = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            price: price,
            products: products,
        })
    })

    let json = await response.json()

    return json
}

export const getIngredients = async () => {
    
    let response = await fetch(`${baseUrl}/ingredients`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })

    let json = await response.json()

    return json
}

export const postProduct = async (name, ingredients, price) => {
    let response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            name: name,
            ingredients: ingredients,
            price: price,
            custom: true
        })
    })

    let json = await response.json()

    return json
}

// put ingredient
export const putIngredient = async (quantity, id) => {
    let response = await fetch(`${baseUrl}/ingredients/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            quantity: quantity,
        })
    })

    let json = await response.json()

    return json
}