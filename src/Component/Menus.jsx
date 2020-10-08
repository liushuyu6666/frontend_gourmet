import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Menus extends Component{
    constructor(props) {
        super(props);
        this.landingId = this.props.match.params.landing_id;
        this.state = {
            data: {},
            error: {},
            input: {},
            addError: "",
            addInput: {},
        }
    }

    changeHandle = (event) => {
        event.preventDefault();
        this.setState({input: {...this.state.input,
                    [event.target.name] : {...this.state.input[event.target.name], [event.target.id]: event.target.value}},
                error: {...this.state.error, [event.target.name]: ""}},
            () => console.log(this.state.input))
    }

    changeCheck = (event) => {
        event.preventDefault();
        this.setState({addInput:{...this.state.addInput,
            [event.target.id]: event.target.value}}, () => {
            console.log(this.state.addInput)
        })
    }

    add = (event) =>{
        let add = {};
        event.preventDefault();
        if(Object.keys(this.state.addInput).length > 0){
            Object.keys(this.state.addInput).map(key => {
                add[key] = this.state.addInput[key];
                console.log(add);
                fetch("http://localhost:8082/v1/landings/"+this.landingId+"/menus",{
                    "method": "POST",
                    "headers":{
                        "Content-Type": "application/json",
                        "token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(add)
                }).then(response => response.json())
                    .then(data => this.setState({addError: data.msg}))
            })

            // re-render the web page
            let token = localStorage.getItem("token");
            if(!token){
                this.props.history.push("/");
            }
            else{
                fetch("http://localhost:8082/v1/landings/" + this.landingId + "/menus",
                    {method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token'),
                        },
                    }).then(res => res.json())
                    .then(data => this.setState({data: data.result},
                        ()=>console.log(this.state)));
            }
        }
        else{
            this.setState({addError: "you have no change"})
        }
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
                console.log(update);
                fetch("http://localhost:8082/v1/landings/"+this.landingId+"/menus/"+menuId,{
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
                fetch("http://localhost:8082/v1/landings/" + this.landingId + "/menus",
                    {method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token'),
                        },
                    }).then(res => res.json())
                    .then(data => this.setState({data: data.result},
                        ()=>console.log(this.state)));
            }
        }
        else{
            this.setState({error: {...this.state.error, [event.target.name]: "you have no change"}})
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    {Object.keys(this.state.data).length > 0 && this.state.data.map(it => (
                        <div key={it.id} id={it.id}  className="col-sm-4 col-12">
                            <div className="card" style={{maxHeight: "700px"}}>
                                <div className="card-body">
                                    <form>
                                        <img src={it.img_url}
                                             className="card-img-top"
                                             alt="no images"/>
                                        <div className="form-group">
                                            <label htmlFor="title">Dishes</label>
                                            <input className="form-control" id="title" name= {it.id}
                                                   style={{"fontSize": 13 + 'px'}}
                                                   defaultValue={it.title}
                                                   onChange={this.changeHandle}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="price">Price</label>
                                            <input className="form-control" id="price" name= {it.id}
                                                    style={{"fontSize": 13 + 'px'}}
                                                    defaultValue={it.price}
                                                    onChange={this.changeHandle}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select className="form-control" id="status" name= {it.id}
                                                    style={{"fontSize": 13 + 'px'}}
                                                    defaultValue={it.status}
                                                    onChange={this.changeHandle}>
                                                <option>applied</option>
                                                <option>canceled</option>
                                            </select>
                                        </div>
                                        <div
                                            className="form-text text-muted">
                                            {this.state.error[it.id]}
                                        </div>
                                        {/*<button className="btn btn-primary" onClick={this.manage} name={it.id}>manage this restaurant</button>*/}
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {Object.keys(this.state.data).length > 0 &&
                <button className="btn btn-primary" onClick={this.submit}>submit</button>}
                <h3>Add</h3>
                <div className="row">
                    <div key="add" className="col-sm-4 col-12">
                        <div className="card" style={{maxHeight: "700px"}}>
                            <div className="card-body">
                                <form>
                                    <img src="https://actionreactionmma.com/wp-content/uploads/2017/04/default-image.jpg"
                                         className="card-img-top"
                                         alt="this should be an image"/>
                                    <div className="form-group">
                                        <label htmlFor="title">Dishes</label>
                                        <input className="form-control" id="title"
                                               style={{"fontSize": 13 + 'px'}}
                                               placeholder="please input dishes"
                                               onChange={this.changeCheck}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Price</label>
                                        <input className="form-control" id="price"
                                               style={{"fontSize": 13 + 'px'}}
                                               placeholder="please input price"
                                               onChange={this.changeCheck}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <select className="form-control" id="status"
                                                style={{"fontSize": 13 + 'px'}}
                                                defaultValue="applied"
                                                onChange={this.changeCheck}>
                                            <option>applied</option>
                                            <option>canceled</option>
                                        </select>
                                    </div>
                                    <div
                                        className="form-text text-muted">
                                        {this.state.addError}
                                    </div>
                                    <button className="btn btn-primary" onClick={this.add}>Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        fetch("http://localhost:8082/v1/landings/" + this.landingId + "/menus",
            {method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token'),
                },
            }).then(res => res.json())
            .then(data => this.setState({data: data.result},
                ()=>console.log(this.state)));
    }

}

export default withRouter(Menus);