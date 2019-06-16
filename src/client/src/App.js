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
      <MenuItem>Home</MenuItem>{' '}
      <MenuItem>Login</MenuItem>
    </div>
  );
}

export default App;
