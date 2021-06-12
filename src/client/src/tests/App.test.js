import React from 'react'
import ReactDom from 'react-dom'
import App from '../App';

test('Running app', () => {
  const div = document.createElement("div")
    ReactDom.render(<App></App>, div)
});
