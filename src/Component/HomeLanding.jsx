import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class HomeLanding extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            input: {}
        }
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
                                            <div id="title" name = {it.id}
                                                   className="font-weight-light"
                                                   style={{"fontSize": 13 + 'px'}}>
                                                    {it.title}</div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    componentDidMount() {
        localStorage.setItem("role", "customer");

        fetch("http://localhost:8082/v1/landings",
            {method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'role': "customer",
                    'token': "no token"
                },
            })
            .then(res => res.json())
            .then(data => this.setState({data: data.result}, () => (this.state.data.map(item => (console.log(item))))))

    }

}

export default withRouter(HomeLanding)