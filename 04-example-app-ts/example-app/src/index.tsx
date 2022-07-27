import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function formatName(user: User) {
  return user.firstName + ' ' + user.lastName;
}

interface User { //オブジェクト型に名前を付ける
  name: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

const user: User = {
  name: 'test',
  firstName: 'Harper',
  lastName: 'Perez',
  avatarUrl: 'test'
};

const element = (
  <h1>
    Hello, {getGreeting(user)}
    <a href="https://www.reactjs.org"> link </a>
    <img src={user.avatarUrl}></img>
  </h1>
);

function getGreeting(user: User){
  if (user){
    return <h1>aaaaa</h1>
  }
  return <h1>bbbb</h1>  
}

interface Props {
  name: string,
}
interface State {}
class Welcome2 extends React.Component<Props, State>{
  user: User;
  constructor( user: User){
    super(user);
    this.user = user;
  }

  render(){
    return<div>test</div>
  }
}

function Welcome(props: any) {
  return <h1>Hello, {props.name}</h1>;
}

const element2 = (
  <h1>
    Hello, {Welcome(user)}
  </h1>
);

const element3 = <Welcome name="Sara" />;

function App2() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

const element4 = App2();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


function Clock(props:any){
  return (
    <div>
      <h2>{props.data.toLocaleTimeString()}</h2>
    </div>
  );
}
//ステートを追加する為にクラスにする
interface MyProps{}
interface MyState{
  date: Date
}

class Clock2 extends React.Component<Props, MyState>{
  constructor(props: Props){
    super(props);
    
    this.state = { date: new Date() };
    //this.timerID = 0;
    // this.timerID2 = undefined;
  }

  timerID: number = 0;
  timerID2: NodeJS.Timer | undefined = undefined;

  //マウント
  componentDidMount(){
    this.timerID2 = setInterval(()=>this.tick(), 1000);    
  }
  
  //アンマウント
  componentWillUnmount(){
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
  }

  render(){
    return(
      <div>
        {/* イベントハンドラいろいろ */}
        <button onClick={this.handleClick}>
          click me!
        </button>
        <button onClick={this.handleClick2}>
          click2 me!
        </button>
        <button onClick={() => console.log('click3')}>
          click3 me!
        </button>        
        <h2>time:{this.state.date.toLocaleTimeString()}</h2>

        <Greeting isLoggedIn={true} />

        <LoginControl></LoginControl>
      </div>
    )
  }
}

interface LoginButtonProps{
  onClick: VoidFunction
}
function LoginButton(props: LoginButtonProps) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
interface LogoutButtonProps{
  onClick: VoidFunction
}
function LogoutButton(props: LogoutButtonProps) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}


//ステート付きコンポーネント
interface LoginProps{

}
interface LoginState {
  isLoggedIn:boolean
}
class LoginControl extends React.Component<LoginProps, LoginState> {
  constructor(props: Props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting() {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting() {
  return <h1>Please sign up.</h1>;
}

interface GreetingProps{
  isLoggedIn: boolean;
}
function Greeting(props: GreetingProps){
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}

root.render(<Clock2 name="test"/>);

// function tick(){
//   root.render(<Clock />);
// }

// setInterval(tick, 1000);

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   root.render(element);
// }
// setInterval(tick, 1000);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
