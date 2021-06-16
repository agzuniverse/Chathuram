import React from 'react'
import ReactDom from 'react-dom'
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
  rest.post(`${api}/create`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ "message": "Successfully Created" })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Renders create form', () => {
  const div = document.createElement("div")
  ReactDom.render(<AddDataToDBTable></AddDataToDBTable>, div)
});

test('Renders input fields correctly', async () => {
  const userToken = { token: "someToken" }
  const dbConfig = { "username": "admin", "url": "localhost", "port": "3306", "db_name": "test", "db_type": "mysql", "tables": ["tbl1", "tbl2", "tbl3"] }
  const dbConfigured = { dbConfigured: "true" }
  const tableName = "tbl1"
  localStorage.setItem('token', JSON.stringify(userToken));
  localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
  localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
  const { findByText, getByLabelText } = render(<AddDataToDBTable table={tableName}></AddDataToDBTable>)
  // Wait for the data to be fetched and the component to render
  await findByText(/bday/i)
  expect(getByLabelText("id").type).toBe("number")
  expect(getByLabelText("name").type).toBe("text")
  expect(getByLabelText("bday").type).toBe("date")
  expect(getByLabelText("address").type).toBe("textarea")
  expect(getByLabelText("isSet").type).toBe("number")
})

test('Creates row', async () => {
  const userToken = { token: "someToken" }
  const dbConfig = { "username": "admin", "url": "localhost", "port": "3306", "db_name": "test", "db_type": "mysql", "tables": ["tbl1", "tbl2", "tbl3"] }
  const dbConfigured = { dbConfigured: "true" }
  const tableName = "table1"
  localStorage.setItem('token', JSON.stringify(userToken));
  localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
  localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
  const { getByText, findByText, getByLabelText } = render(<AddDataToDBTable table={tableName}></AddDataToDBTable>)
  // Wait for the data to be fetched and the component to render
  await findByText(/bday/i)
  fireEvent.change(getByLabelText("id"), { target: { value: 4 } })
  fireEvent.change(getByLabelText("name"), { target: { value: 'Temp' } })
  fireEvent.change(getByLabelText("bday"), { target: { value: '2001-01-03' } })
  fireEvent.change(getByLabelText("address"), { target: { value: 'Tempoor four' } })
  fireEvent.change(getByLabelText("isSet"), { target: { value: 1 } })
  fireEvent.click(getByText("S A V E"))
  const elt = await findByText(/tempoor/i)
  console.log(elt.tagName);
  expect(elt.textContent).toBe("Tempoor four")
})