// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { useLocation } from 'react-router-dom';

function Contact(props: any ) {
  const location = useLocation();
  console.log(location);
  //{pathname: '/contact', search: '?api_key=testtesttest', hash: '', state: null, key: 'elr1pblp'}
  //searchにQuery Parameterが入る

  return (
    <h2>contact page : {props.message}</h2>
  );
}

export default Contact;
