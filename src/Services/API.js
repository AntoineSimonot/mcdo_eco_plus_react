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

// get product
export const getProduct = async (id) => {
        
        let response = await fetch(`${baseUrl}/products/${id}`, {
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

export const postProduct = async ({name, pti, price, custom}) => {
    let response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            name: name,
            ingredients: pti,
            price: price,
            custom: custom
        })
    })

    let json = await response.json()

    return json
}

// put ingredient
export const changeIngredientQuantity = async (quantity, id) => {
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

// get one ingredient
export const getIngredient = async (id) => {
    let response = await fetch(`${baseUrl}/ingredients/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })

    let json = await response.json()

    return json
}


// get orders
export const getOrders = async () => {
    let response = await fetch(`${baseUrl}/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })

    let json = await response.json()

    return json
}

// delete orders
export const deleteOrder = async (id) => {
    let response = await fetch(`${baseUrl}/orders/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })

    let json = await response.json()

    return json
}
// put order status
export const putOrderStatus = async (id, status) => {
    let response = await fetch(`${baseUrl}/orders/${id}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            status: status,
        })
    })

    let json = await response.json()

    return json
}

// post ingredient 
export const postIngredient = async ({name, quantity, price}) => {
    let response = await fetch(`${baseUrl}/ingredients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            name: name,
            quantity: quantity,
            price: price,
        })
    })

    let json = await response.json()

    return json
}

// post file
export const postImage = async (file) => {
    let formData = new FormData()
    formData.append('image', file, file.name)

    let response = await fetch(`${baseUrl}/files`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
        body: formData
    })

    let json = await response.json()

    return json
}

// put ingredient
export const putIngredient = async (id, data) => {
    let response = await fetch(`${baseUrl}/ingredients/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(
            {...data}
        )
    })

    let json = await response.json()

    return json
}

// delete ingredient
export const deleteIngredient = async (id) => {
    let response = await fetch(`${baseUrl}/ingredients/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })

    let json = await response.json()

    return json
}

// delete product
export const deleteProduct = async (id) => {
    let response = await fetch(`${baseUrl}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })

    let json = await response.json()

    return json
}

// put product
export const putProduct = async (id, data) => {
    let response = await fetch(`${baseUrl}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(
            {...data}
        )
    })

    let json = await response.json()

    return json
}


