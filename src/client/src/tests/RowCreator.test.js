import React from 'react'
import ReactDom from 'react-dom'
import AddDataToDBTable from '../components/AddDataToDBTable';

import {render, fireEvent, cleanup, getByLabelText} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'

afterEach(cleanup)

test('Renders create form', () => {
  const div = document.createElement("div")
    ReactDom.render(<AddDataToDBTable></AddDataToDBTable>, div)
});

// test('Create row', async() => {
//     const userToken = {token:"someToken"}
//     const dbConfig = {"username":"admin","url":"localhost","port":"3306","db_name":"test","db_type":"mysql","tables":["books","table1","table2","toys"]}
//     const dbConfigured = {dbConfigured:"true"}
//     const tableName = "table1"
//     localStorage.setItem('token', JSON.stringify(userToken));
//     localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
//     localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
//     const { getByText, findByText, getByLabelText } = render(<AddDataToDBTable table={tableName}></AddDataToDBTable>)
//     const elt = await findByText(/lastname/i)

//     fireEvent.change(getByLabelText("studentId"), {target: {value: 9 } } )
//     fireEvent.change(getByLabelText("firstname"), {target: {value: 'Temp' } } )
//     fireEvent.change(getByLabelText("lastname"), {target: {value: 'phrrr' } } )
//     fireEvent.change(getByLabelText("Adress"), {target: {value: 'tempoor' } } )
//     fireEvent.change(getByLabelText("isCustomer"), {target: {value: 1 } } )
//     fireEvent.click(getByText("S A V E"))
//     const x = await findByText(/tempoor/i)
// })