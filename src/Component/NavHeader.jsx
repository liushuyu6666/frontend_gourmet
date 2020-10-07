import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

class NavHeader extends Component {
    constructor(props) {
        super(props);
        console.log("isLogin is" + this.props.isLogin);
    }

    render() {
        return (
            <>
                <nav>
                    <div className="nav-wrapper" style={{"background": "white"}}>
                        <a href="#" data-target="slide-out" className="sidenav-trigger">
                            <i className="material-icons" style={{"color": "black"}}>menu</i>
                        </a>
                        <ul className="center">
                            <li ><a href="" style={{"color": "black"}}>Dish</a></li>
                        </ul>
                        <ul className="right">
                            <li><a href="sass.html">
                                <i className="material-icons" style={{"color": "black"}}>search</i></a>
                            </li>
                            <li><a href="badges.html">
                                <i className="material-icons" style={{"color": "black"}}>shopping_cart</i></a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div id="slide-out" className="sidenav">

                    {this.props.isLogin?
                    (<Profile/>):
                    (
                    <Router>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <Link to="/login" className="nav-link" role="tab">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item" role="presentation">
                                <Link to="/register" className="nav-link" role="tab">
                                    Register
                                </Link>
                            </li>
                        </ul>
                        <Switch>
                            <Route path="/login" exact>
                                <Login/>
                            </Route>
                            <Route path="/register" exact>
                                <Register/>
                            </Route>
                            <Route path="/profile" exact>
                                <Profile/>
                            </Route>
                        </Switch>
                    </Router>)}
                </div>
            </>

        )
    }
}

export default NavHeader;


