import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    logout = (event) =>{
        event.preventDefault();
        localStorage.clear();
        this.props.history.push("/login");
    }

    menu = (event) =>{
        event.preventDefault();
        this.props.history.push("/menu");
    }

    render() {
        if(this.state.data){
            // localStorage.clear();
            // this.props.history.push("/");
        }
        return(
            <form>
                <h5>Profile of {this.state.data.username}</h5>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp"
                           placeholder="Enter email" defaultValue={this.state.data.password}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">First Name</label>
                    <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp"
                           placeholder="Enter email" defaultValue={this.state.data.first_name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Last Name</label>
                    <input type="text" className="form-control" id="last_name" aria-describedby="emailHelp"
                           placeholder="Enter email" defaultValue={this.state.data.last_name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Status</label>
                    <select className="form-control" id="status" aria-describedby="emailHelp"
                           placeholder="Enter email" defaultValue={this.state.data.status}>
                        <option selected>active</option>
                        <option>still active</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="email" className="form-control" id="status" aria-describedby="emailHelp"
                           placeholder="Enter email" defaultValue={this.state.data.email}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="submit" className="btn btn-danger" onClick={this.logout}>Logout</button>
                <button type="submit" className="btn btn-primary" onClick={this.menu}>Manage Menu</button>
            </form>
        )
    }

    componentDidMount() {
        console.log("here in componentDidMount");
        let token = localStorage.getItem("token");
        if(!token){
            this.props.history.push("/login");
        }
        else{
            fetch("http://localhost:8082/v1/profile",
                {method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token'),
                    },
                })
                .then(res => res.json())
                .then(data => this.setState({data: data.result}, () => console.log(this.state.data)))
        }
    }

}

export default withRouter(Profile);