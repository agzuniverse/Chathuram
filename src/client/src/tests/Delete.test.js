import React from 'react'
import ReactDom from 'react-dom'
import Table from '../components/Table'
import { testData, metaData, tables } from '../components/testData'

import { render, fireEvent, cleanup } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const api = "http://127.0.0.1:5000"

const server = setupServer(
  rest.post(`${api}/read`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ "metadata": metaData, "rows": testData, "pages": 1 })
    )
  }),
  rest.post(`${api}/delete`, (req, res, ctx) => {
    expect(req.body.bday).toBe("2005-11-06")
    return res(
      ctx.status(200),
      ctx.json({ "message": "Successfully Deleted" })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Renders table', () => {
  const div = document.createElement("div")
  ReactDom.render(<Table></Table>, div)
});

test('Render table with prop', async () => {
  const userToken = { token: "someToken" }
  const dbConfig = { "username": "admin", "url": "localhost", "port": "3306", "db_name": "test", "db_type": "mysql", "tables": ["tbl1", "tbl2", "tbl3"] }
  const dbConfigured = { dbConfigured: "true" }
  const tableName = "table1"
  localStorage.setItem('token', JSON.stringify(userToken));
  localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
  localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
  const { findByTestId } = render(<Table tableName={tableName}></Table>)

  const del = await findByTestId("del2")
  fireEvent.click(del)
  const confirm = await findByTestId("confirm")
  fireEvent.click(confirm)
})