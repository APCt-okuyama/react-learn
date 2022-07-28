import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Home from './routes/home';
import About from './routes/about';
import Contact from './routes/contact';
import NoMatch from './routes/nomatch';
import Posts from './routes/posts';
import Post from './routes/post';

import MyClock from './MyClock';

function App() {

  const active = {
    fontWeight: "bold",
    color: "#d57276"
  }

  const inactive = {
    fontWeight: "normal",
    color: "#65b2c6"
  }

  return (
    <div>
      <MyClock/>
      <ul>
        <li>
          {/* <a href="/">Home</a> */}
          {/* <Link to="/">Home</Link> */}
          <NavLink to="/" style={({ isActive }) => isActive ? active : inactive} >
            <h2>Home</h2> 
          </NavLink>
        </li>
        <li>
          {/* <a href="/about">About</a> */}
          <NavLink to="/about" style={({ isActive }) => isActive ? active : inactive} > 
            <h2>About</h2> 
          </NavLink>
        </li>
        <li>
          {/* <a href="/contact">Contact</a> */}
          {/* cssのクラスで指定 */}
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'example' : undefined} >
            <h2>Contact</h2>
          </NavLink>
        </li>
      </ul>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact message="this is my contact msg" />} />
        <Route path="*" element={<NoMatch />} />
        {/* ネストできる　 Outletコンポーネント*/}
        <Route path="/posts" element={<Posts />}>
          <Route path=":postId" element={<Post />} />
        </Route>
      </Routes>
    </div>

  );
}

export default App;
