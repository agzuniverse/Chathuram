import React from 'react'
import ReactDom from 'react-dom'
import {Header} from '../components/Header';

test('renders learn react link', () => {
  const div = document.createElement("div")
    ReactDom.render(<Header></Header>, div)
});
