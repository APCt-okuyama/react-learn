import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

function App() {
  const [mytext1, setMyText1] = useState("default value mytext1");
  const [mytext2, setMyText2] = useState("default value mytext2");
  const [mytext3, setMyText3] = useState("default value mytext3");

  return (
    <div className="App">
      <header>これはPWAのサンプルです。</header>

      <div>
        <button onClick={clearCache}>Clear Cache</button>
        <textarea value={mytext1} />
      </div>

      <div>
        <button onClick={callAPIFetch}>callAPI - fetch api</button>
        <textarea value={mytext2} />
      </div>

      <div>
        <button onClick={callAPIAxios}>callAPI - axios</button>
        <textarea value={mytext3} />
      </div>

    </div>
  );

  function clearCache() {
    console.log('Start clearCache.');
    setMyText1("aaa");
  }

  function callAPIFetch() {
    console.log('Start callAPIFetch.');
    fetch('/mytest.json')
      .then((response) => {
        //response.json()　※プロミスを返す
        //response.text()  ※プロミスを返す      
        return response.json()
      })
      .then((data)=>{
        console.log('callAPIFetch success:', data);
        setMyText2(JSON.stringify(data));
      });
  }

  function callAPIAxios() {
    console.log('Start callAPIAxios.');
    axios.get("/mytest2.json")
      .then((response)=>{
        console.log('callAPIAxios success:', response.data);
        setMyText3(JSON.stringify(response.data));        
      })      
      .catch((error)=>{
        console.log('callAPIAxios error:', error);
        setMyText3(JSON.stringify(error));
      });      
  }

}

export default App;
