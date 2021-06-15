import React, {useContext} from 'react'
import ReactDom from 'react-dom'
import {Error} from '../components/Error';
import { ErrorContext } from '../Contexts';

import {render, fireEvent, cleanup} from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

test('Render error component with error', async() => {
    const userToken = {token:"someToken"}
    const dbConfig = {"username":"admin","url":"localhost","port":"3306","db_name":"test","db_type":"mysql","tables":["tbl1","tbl2","tbl3"]}
    const dbConfigured = {dbConfigured:"true"}
    const tableName = "table1"
    localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
    localStorage.setItem('dbConfigured', JSON.stringify(dbConfigured));
    const { errorMessage, setErrorMessage, clearError } = renderHook(() => useContext(ErrorContext))
    setErrorMessage("Integrity error")
    const { findByText, findByTestId } = render(<Error></Error>)
    const elt = await findByTestId("error")
    expect(elt.textContent).toBe("Integrity error")
})

