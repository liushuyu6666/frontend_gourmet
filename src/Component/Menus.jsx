import React, {Component} from "react";

class Menus extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }


    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    {[1, 2, 3, 4].map(it => (
                        <div key={it} className="col-sm-3 col-6">
                            <div className="card" style={{maxHeight: "300px"}}>
                                <img src="https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg"
                                     className="card-img-top"
                                     alt="..."/>
                                <div className="card-body">
                                    <div id="dishes"
                                         className="font-weight-light"
                                         style={{"font-size": 10 + 'px'}}>Dishes name here</div>
                                    <div id="price"
                                         className="font-weight-bold text-danger"
                                         style={{"font-size": 12 + 'px'}}>$123</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }


}

export default Menus