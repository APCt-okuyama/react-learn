import React from 'react';

interface MyProps {}
interface MyState { count: number }
class MyClassExample extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
  }

  export default MyClassExample;