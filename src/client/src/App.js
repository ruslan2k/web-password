import React from 'react';
import { NavLink } from 'react-router-dom'
import './App.css';

const MenuItem = ({ children }) => (
  <NavLink
    to='/'
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </NavLink>
)

function App() {
  return (
    <div>
      <h1>App</h1>
    </div>
  );
}

export default App;
