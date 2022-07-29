import React, { useEffect, useState } from 'react';

function MyExample() {
  // Declare a new state variable, which we'll call "count"
  const [count, setMyCount] = useState(0);
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  console.log('useState start');
  //const [mystring, setMyString] = useState(null); //null
    
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API

    //props や state にアクセスすることが可能
    console.log('useEffect start ' + count);
    document.title = `You clicked ${count} times`;

    return function cleanup() {
        console.log('useEffect cleanup () 次の処理の前に呼ばれる');
        //ここでクリーンアップする　初期化
        //更新ロジック書き忘れによるバグを防止
        //
        // classの場合は
        // componentDidMount, omponentDidUpdate componentWillUnmount,  を駆使
    }
  });

  return (
    <div>
      <p>You clicked {count} times {age} {fruit} </p>
      <button onClick={() => setMyCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default MyExample;