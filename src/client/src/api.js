const api = "http://127.0.0.1:5000"

export async function loginUser(credentials) {
    return fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export async function setConfig(config) {
    return fetch(`${api}/config`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}