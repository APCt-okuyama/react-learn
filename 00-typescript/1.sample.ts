//
// npx tsc 1.sample.ts
//
console.log('this is ts program.')

function func1(){
    console.log('func 1.')
}

func1();

// アロー関数　文字列を返す
let test = () => "test message";
console.log(test());

const getOne = () => {
    return 1;
  };  
console.log(getOne());

//型を指定しないとエラーになる
//const increment = num => num + 1;
const increment = (num: number) => num + 1;


