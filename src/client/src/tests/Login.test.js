import React from 'react'
import ReactDom from 'react-dom'
import Login from '../components/Login';
import useToken from '../hooks/useToken';

import {render, fireEvent, cleanup} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const api = "http://127.0.0.1:5000"

const server = setupServer(
  rest.post(`${api}/login`, (req, res, ctx) => {
    expect(req.body.username).toBe('user')
    expect(req.body.password).toBe('pass')
    return res(ctx.status(200), ctx.json({"token": "some_token"}))
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('renders login component', () => {
  const div = document.createElement("div")
    ReactDom.render(<Login></Login>, div)
});

test('Inputing text updates the state', async() => {
    const { token, setToken } = renderHook(() => useToken())
    const { getByText, getByPlaceholderText, findByText } = render(<Login setToken={setToken}></Login>);
    fireEvent.change(getByPlaceholderText("Enter username"), {target: {value: 'user' } } )
    fireEvent.change(getByPlaceholderText("Password"), {target: {value: 'pass' } } )
    fireEvent.click(getByText("S U B M I T"))
})