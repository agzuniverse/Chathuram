import React from 'react'
import ReactDom from 'react-dom'
import Table from '../components/Table'
import { testData, metaData, tables } from '../components/testData'

import { render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const api = "http://127.0.0.1:5000"

const server = setupServer(
  rest.get(`${api}/tables`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ "tables": tables }))
  }),
  rest.post(`${api}/read`, (req, res, ctx) => {
    expect(req.body.table).toBe('tbl1')
    expect(req.body.pageNum).toBe(1)
    return res(
      ctx.status(200),
      ctx.json({ "metadata": metaData, "rows": testData, "pages": 1 })
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
  const tableName = "tbl1"
  localStorage.setItem('token', JSON.stringify(userToken));
  localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
  localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
  const { findByText } = render(<Table tableName={tableName}></Table>)
  const elt = await findByText(/three/i)
  expect(elt.textContent).toBe("Wonder land three")
})