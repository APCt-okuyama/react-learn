//
// npx tsc 1.sample.ts
//
console.log('this is ts program.');
function func1() {
    console.log('func 1.');
}
func1();
// アロー関数　文字列を返す
var test = function () { return "test message"; };
console.log(test());
var getOne = function () {
    return 1;
};
console.log(getOne());
