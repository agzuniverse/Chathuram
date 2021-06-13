import React from 'react'
import ReactDom from 'react-dom'
import Login from '../components/Login';
import useToken from '../hooks/useToken';

import {render, fireEvent, cleanup} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'

afterEach(cleanup)

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