import React from 'react'
import ReactDom from 'react-dom'
import App from '../App';

test('renders learn react link', () => {
  const div = document.createElement("div")
    ReactDom.render(<App></App>, div)
});
