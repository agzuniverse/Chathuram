const api = "http://127.0.0.1:5000";

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
            'Content-Type': 'application/json',
            "x-access-token": JSON.parse(localStorage.getItem('token')).token
        },
        body: JSON.stringify(config)
    }).then(data => data.json())
}

export async function addData(tableName) {
    return fetch(`${api}/meta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": JSON.parse(localStorage.getItem('token')).token
        },
        body: JSON.stringify(tableName)
    }).then(data => data.json())
}

export async function getTablesList() {
    return fetch(`${api}/tables`, {
        headers: {
            "x-access-token": JSON.parse(localStorage.getItem('token')).token
        },
    }).then(data => data.json())
}