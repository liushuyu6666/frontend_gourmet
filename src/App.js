import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menus from "./Component/Menus";
import Landing from "./Component/Landing"
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
              <Route path="/" exact>
                  <Home/>
              </Route>
              <Route path="/landing" exact>
                  <Landing/>
              </Route>
              <Route path="/landing/:landing_id/menu/edit">
                  <Menus/>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
