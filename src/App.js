import React from 'react';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Account from './components/Account.jsx';
import Restaurant from './components/Restaurant.jsx';
import {hot} from 'react-hot-loader';
function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Account/>
      <Restaurant/>
    </React.Fragment>
  );
}
export default hot(module)(App);