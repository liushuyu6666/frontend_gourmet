import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Landing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            input: {},
            error: {}
        }
    }

    changeHandle = (event) => {
        event.preventDefault();
        this.setState({input: {...this.state.input,
                [event.target.name] : {...this.state.input[event.target.name], [event.target.id]: event.target.value}},
            error: {...this.state.error, [event.target.name]: ""}},
            () => console.log(this.state.input))
    }

    submit = (event) =>{
        let update = {};
        event.preventDefault();
        // console.log(event.target.id);
        if(Object.keys(this.state.input).length > 0){
            Object.keys(this.state.input).map(menuId => {
                update = {};
                Object.keys(this.state.input[menuId]).map(colName => {
                    // console.log(colName);
                    // console.log(this.state.input[menuId][colName]);
                    update[colName] = this.state.input[menuId][colName];
                })
                fetch("http://localhost:8082/v1/landings/"+menuId,{
                    "method": "POST",
                    "headers":{
                        "Content-Type": "application/json",
                        "token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(update)
                }).then(response => response.json())
                    .then(data => this.setState({error: {...this.state.error, [menuId]:data.msg}}))
            })

            // re-render the web page
            let token = localStorage.getItem("token");
            if(!token){
                this.props.history.push("/");
            }
            else{
                fetch("http://localhost:8082/v1/landings",
                    {method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token'),
                            'role': 'owner'
                        },
                    })
                    .then(res => res.json())
                    .then(data => this.setState({data: data.result}, () => (this.state.data.map(item => (console.log(item))))))
            }
        }
        else{
            this.setState({error: {...this.state.error, [event.target.name]: "you have no change"}})
        }
    }

    manage = (event) => {
        event.preventDefault();
        console.log(event.target.name);
        this.props.history.push("/landing/" + event.target.name + "/menu/edit");
    }


    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    {Object.keys(this.state.data).length > 0 && this.state.data.map(it => (
                        <div key={it.id} id={it.id}  className="col-sm-4 col-12">
                            <div className="card" style={{maxHeight: "300px"}}>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input id="title" name = {it.id}
                                                   className="font-weight-light"
                                                   style={{"fontSize": 13 + 'px'}}
                                                   defaultValue= {it.title}
                                                   onChange={this.changeHandle}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select className="form-control" id="status" name= {it.id}
                                                    style={{"fontSize": 13 + 'px'}}
                                                    defaultValue={it.status}
                                                    onChange={this.changeHandle}>
                                                <option>active</option>
                                                <option>de-active</option>
                                            </select>
                                        </div>
                                        <div
                                            className="form-text text-muted">
                                            {this.state.error[it.id]}
                                        </div>
                                        <button className="btn btn-primary" onClick={this.manage} name={it.id}>manage this restaurant</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" onClick={this.submit} >submit</button>
            </div>
        )
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        if(!token){
            this.props.history.push("/");
        }
        else{
            fetch("http://localhost:8082/v1/landings",
                {method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token'),
                        'role': "owner"
                    },
                })
                .then(res => res.json())
                .then(data => this.setState({data: data.result}, () => (this.state.data.map(item => (console.log(item))))))
        }
    }

}

export default withRouter(Landing)