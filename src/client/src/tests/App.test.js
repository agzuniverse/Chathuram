import React from 'react'
import ReactDom from 'react-dom'
import App from '../App';

test('App runs without crashing', () => {
  const div = document.createElement('div')
  ReactDom.render(<App></App>, div)
})