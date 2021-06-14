import React from 'react'
import ReactDom from 'react-dom'
import AddDataToDBTable from '../components/AddDataToDBTable';

import {render, fireEvent, cleanup} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'

afterEach(cleanup)

test('Renders table', () => {
  const div = document.createElement("div")
    ReactDom.render(<AddDataToDBTable></AddDataToDBTable>, div)
});

// test('Edit row', async() => {
//     const userToken = {token:"someToken"}
//     const dbConfig = {"username":"admin","url":"localhost","port":"3306","db_name":"test","db_type":"mysql","tables":["books","table1","table2","toys"]}
//     const dbConfigured = {dbConfigured:"true"}
//     const tableName = "table1"
//     const oldRow = [ "6", "Athul", "Sathyan", "Eroor", "0" ]
//     localStorage.setItem('token', JSON.stringify(userToken));
//     localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
//     localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
//     const { findByText, getByText, getByLabelText } = render(<AddDataToDBTable table={tableName} oldRow={oldRow}></AddDataToDBTable>)
//     const rowOne = await findByText(/eroor/i)

//     fireEvent.change(getByLabelText("Adress"), {target: {value: 'Erooor' } } )
//     fireEvent.click(getByText("S A V E"))
//     const x = await findByText(/Erooor/i)
// })