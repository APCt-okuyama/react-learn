import React from 'react';
import logo from './logo.svg';
import './App.css';
import Example from './myhook';
import MyClassExample from './myclass';
//hook
function App() {
  return (
    <div>
      <h2>hookの練習</h2>
      <p>クラスコンポーネントと関数コンポーネント</p>
      <Example />
      <MyClassExample />
    </div>
  );
}

export default App;
