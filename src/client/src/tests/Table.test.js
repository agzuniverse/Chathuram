import React from 'react'
import ReactDom from 'react-dom'
import Table from '../components/Table';

import {render, fireEvent, cleanup} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'

afterEach(cleanup)

test('Renders table', () => {
  const div = document.createElement("div")
    ReactDom.render(<Table></Table>, div)
});

test('Render table with prop', async() => {
    const userToken = {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MjM1MzU1NTN9.jJxMOynPQJH4p5aVPft8HxZKXt34gQypqidz6oVkG8Y"}
    const dbConfig = {"username":"admin","url":"localhost","port":"3306","db_name":"test","db_type":"mysql","tables":["books","table1","table2","toys"]}
    const dbConfigured = {dbConfigured:"true"}
    const tableName = "table1"
    localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
    localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
    const { findByText, findByTestId } = render(<Table tableName={tableName}></Table>)
    const rowOne = await findByText(/aswin/i)
})