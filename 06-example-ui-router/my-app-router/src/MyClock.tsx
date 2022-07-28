import React, { Component } from 'react';

interface MyProps { }
interface MyState {
  date: Date
}

class MyClock extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
    
        this.state = { date: new Date() };
        //this.timerID = 0;
        // this.timerID2 = undefined;
      }
    
      timerID: number = 0;
      timerID2: NodeJS.Timer | undefined = undefined;
    
      //マウント
      componentDidMount() {
        this.timerID2 = setInterval(() => this.tick(), 1000);
      }
    
      //アンマウント
      componentWillUnmount() {
        clearInterval(this.timerID2);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }
    
      // This syntax ensures `this` is bound within handleClick.
      handleClick2 = () => {
        console.log('this is:', this);
      };
    
      handleClick() {
        console.log("clickされました。");
      };
    
      render() {
        return (
          <div>
            <h2>只今の時刻は 
              {this.state.date.toLocaleDateString() + " " + this.state.date.toLocaleTimeString()}
            </h2>
          </div>
        )
      }
    
      mylist: number[] = [1, 2, 3, 4, 5];
      listItems = this.mylist.map((mynumber) =>
        //適切なkeyを設定しましょう。
        //配列内で一意なキーを設定する
        <li key={mynumber.toString()}>
          {mynumber}
        </li>
      );
}

export default MyClock;