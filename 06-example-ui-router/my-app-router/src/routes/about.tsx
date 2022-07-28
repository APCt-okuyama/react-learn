// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function About() {
  const location = useLocation();
  console.log(location);
  
  const navigate = useNavigate();

  return (
    <div>
      <h2>about</h2>
      <button onClick={() => navigate('/contact?api_key=testtesttest')}> go to contact</button>
    </div>
  );
}

export default About;
