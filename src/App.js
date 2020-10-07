import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menus from "./Component/Menus";
import Home from "./Component/Home";
import Login from "./Component/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";


function App() {
  return (
    // <div className="App">
    //   <Landing/>
    // </div>
      <Router>
          <Switch>
              <Router path="/" exact>
                  <Home/>
              </Router>
              <Router path="/menu">
                  <Menus/>
              </Router>
          </Switch>
      </Router>
  );
}

export default App;
