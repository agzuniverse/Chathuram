import React from 'react'
import AddDataToDBTable from '../components/AddDataToDBTable';
import { metaData } from '../components/testData'

import { render, fireEvent } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const api = "http://127.0.0.1:5000"

const server = setupServer(
  rest.post(`${api}/meta`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ "metadata": metaData })
    )
  }),
  rest.post(`${api}/update`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ "message": "Successfully Updated" })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Edit row', async () => {
  const userToken = { token: "someToken" }
  const dbConfig = { "username": "admin", "url": "localhost", "port": "3306", "db_name": "test", "db_type": "mysql", "tables": ["tbl1", "tbl2", "tbl3"] }
  const dbConfigured = { dbConfigured: "true" }
  localStorage.setItem('token', JSON.stringify(userToken));
  localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
  localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
  const tableName = "tbl1"
  const oldRow = [2, "def", "2005-11-05", "Wonder land two", 0]
  const { findByText, getByText, getByLabelText } = render(<AddDataToDBTable table={tableName} oldRow={oldRow}></AddDataToDBTable>)
  await findByText(/wonder/i)
  fireEvent.change(getByLabelText("address"), { target: { value: 'Wonder land 2' } })
  fireEvent.click(getByText("S A V E"))
  const elt = await findByText(/wonder/i)
  expect(elt.textContent).toBe("Wonder land 2")
})