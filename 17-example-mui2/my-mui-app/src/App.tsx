import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import { Routes, Route } from 'react-router-dom';
import NoMatch from './components/NoMatch'
import SignIn from './components/signin/SignInSide'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
