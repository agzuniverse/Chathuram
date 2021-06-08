import React from 'react'
import ReactDom from 'react-dom'
import Login from '../components/Login';

import {render, fireEvent, cleanup} from '@testing-library/react';

afterEach(cleanup)

test('renders learn react link', () => {
  const div = document.createElement("div")
    ReactDom.render(<Login></Login>, div)
});

it('Inputing text updates the state', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.change(getByPlaceholderText("Enter username"), {target: {value: 'user' } } )
    fireEvent.change(getByPlaceholderText("Password"), {target: {value: 'pass' } } )
    fireEvent.click(getByText("S U B M I T"))
    console.log(localStorage.getItem('token'))
})