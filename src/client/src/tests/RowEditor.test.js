import React from 'react'
import ReactDom from 'react-dom'
import AddDataToDBTable from '../components/AddDataToDBTable';
import {testData, metaData, tables} from '../components/testData'

import {render, fireEvent, cleanup} from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const api = "http://127.0.0.1:5000"

const server = setupServer(
  rest.get(`${api}/tables`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({"tables": tables}))
  }),
  rest.post(`${api}/meta`, (req, res, ctx) => {
    return res(
      ctx.status(200), 
      ctx.json({"metadata": metaData})
    )
  }),
  rest.post(`${api}/read`, (req, res, ctx) => {
    return res(
      ctx.status(200), 
      ctx.json({"metadata": metaData, "rows": testData, "pages": 1})
    )
  }),
  rest.post(`${api}/update`, (req, res, ctx) => {
    console.log("Successfully Updated")
    return res(
      ctx.status(200), 
      ctx.json({"message": "Successfully Updated"})
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Renders table', () => {
  const div = document.createElement("div")
    ReactDom.render(<AddDataToDBTable></AddDataToDBTable>, div)
});

test('Edit row', async() => {
    const userToken = {token:"someToken"}
    const dbConfig = {"username":"admin","url":"localhost","port":"3306","db_name":"test","db_type":"mysql","tables":["tbl1","tbl2","tbl3"]}
    const dbConfigured = {dbConfigured:"true"}
    const tableName = "table1"
    const oldRow = [2, "def", "2005-11-05", "Wonder land two", 0]
    localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
    localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
    const { findByText, getByText, getByLabelText } = render(<AddDataToDBTable table={tableName} oldRow={oldRow}></AddDataToDBTable>)
    const elt = await findByText(/wonder/i)

    fireEvent.change(getByLabelText("address"), {target: {value: 'Wonder land 2' } } )
    fireEvent.click(getByText("S A V E"))
    const elt2 = await findByText(/wonder/i)
    expect(elt2.textContent).toBe("Wonder land 2")
})