import React from 'react';
import logo from './logo.svg';
import './App.css';

import AppHeader from './appHeader';
import AppMenu from './appMenu';
import AppDashboard from './appDashboard';
import AppFooter from './appFooter';

function App() {
  console.log(process.env.REACT_APP_API1);
  console.log(process.env.REACT_APP_API1);
  console.log(process.env.REACT_APP_API2);
  
  return (
    <div className="wrapper">
      <AppHeader></AppHeader>
      <AppMenu></AppMenu>
      <AppDashboard></AppDashboard>      
      <AppFooter></AppFooter>
    </div>
  );
}

export default App;
