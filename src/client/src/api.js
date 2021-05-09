import { logout } from "./components/Header";

const api = "http://127.0.0.1:5000"

const token = JSON.parse(localStorage.getItem("token"))?.token
let expiryTime;
if (token) {
    const base64decoded = atob(token.split(".")[1])
    expiryTime = JSON.parse(base64decoded).exp
}


const isTokenExpired = () => {
    const currentTime = Date.now().valueOf() / 1000
    if (currentTime > expiryTime) {
        console.log("ERROR: Token expired")
        logout()
    }
}

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
    isTokenExpired()
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
    isTokenExpired()
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
    isTokenExpired()
    return fetch(`${api}/tables`, {
        headers: {
            "x-access-token": JSON.parse(localStorage.getItem('token')).token
        },
    }).then(data => data.json())
}

export async function readData(tableName) {
    console.log("Argument received is " + tableName)
    isTokenExpired()
    return fetch(`${api}/read`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": JSON.parse(localStorage.getItem('token')).token
        },
        body: JSON.stringify({ "table": tableName })
    }).then(data => data.json())
}

export async function updateData(updateData) {
    isTokenExpired()
    return fetch(`${api}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": JSON.parse(localStorage.getItem('token')).token
        },
        body: JSON.stringify({
            "table": updateData.tableName,
            "row": updateData.newRow,
            'old_row': updateData.oldRow
        })
    }).then(data => data.json())
}

export async function removeRow(rowDetail) {
    isTokenExpired()
    return fetch(`${api}/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": JSON.parse(localStorage.getItem('token')).token
        },
        body: JSON.stringify(rowDetail)
    }).then(data => data.json())
}