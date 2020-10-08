import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import NavHeader from "./NavHeader";
import HomeLanding from "./HomeLanding";

const FAKE_DATA = {
    head: [
        {
            title: 'Welcome to J',
            description: 'Mobile Template',
            backgroundURL: 'http://astylers.com/dish/images/product1.jpg'
        },
        {
            title: 'Welcome to J',
            description: 'Mobile Template',
            backgroundURL: 'http://astylers.com/dish/images/product1.jpg'
        },
        {
            title: 'Welcome to J',
            description: 'Mobile Template',
            backgroundURL: 'http://astylers.com/dish/images/product1.jpg'
        }
    ],
    feature: [
        {
            title: 'Free Wife',
            iconName: 'fa-wifi',
            iconUrl: '',
        },
        {
            title: 'Free Wife',
            iconName: 'fa-phone',
            iconUrl: '',
        },
        {
            title: 'Free Wife',
            iconName: 'fa-phone',
            iconUrl: '',
        }
    ],
    menu: [
        {
            title: 'Delicious thick noodles',
            price: 12,
            backgroundURL: 'http://astylers.com/dish/images/product1.jpg'
        },
        {
            title: 'Delidles',
            price: 45,
            backgroundURL: 'http://astylers.com/dish/images/product2.jpg'
        },
        {
            title: 'hanburge',
            price: 12,
            backgroundURL: 'http://astylers.com/dish/images/product3.jpg'
        },
        {
            title: 'slice',
            price: 12,
            backgroundURL: 'http://astylers.com/dish/images/product4.jpg'
        },
        {
            title: 'Delicious thick noodles',
            price: 45,
            backgroundURL: 'http://astylers.com/dish/images/product5.jpg'
        },
        {
            title: 'Delicious thick noodles',
            price: 12,
            backgroundURL: 'http://astylers.com/dish/images/product6.jpg'
        },
        {
            title: 'Delicious thick noodles',
            price: 12,
            backgroundURL: 'http://astylers.com/dish/images/gallery1.jpg'
        },
        {
            title: 'Delicious thick noodles',
            price: 45,
            backgroundURL: 'http://astylers.com/dish/images/gallery2.jpg'
        },
    ]
}

function HeaderSection(props){
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="http://astylers.com/dish/images/slider1.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="http://astylers.com/dish/images/slider2.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="http://astylers.com/dish/images/slider3.jpg" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    )
}

function MenuSection(props){
    // console.log("sectionmenu");
    // console.log(props.data);
    // let {data} = props;
    return (
        <div className="container-fluid">
            <div className="row">
                {props.menu.map(it => (
                    <div key={it} className="col-sm-3 col-6">
                        <div className="card" style={{maxHeight: "300px"}}>
                            <img src={it.backgroundURL}
                                 className="card-img-top"
                                 alt="..."/>
                            <div className="card-body">
                                <div id="dishes"
                                     className="font-weight-light"
                                     style={{"font-size": 10 + 'px'}}>{it.title}</div>
                                <div id="price"
                                     className="font-weight-bold text-danger"
                                     style={{"font-size": 12 + 'px'}}>${it.price}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            landingData: null,
            isLogin: false,
        }
    }

    componentDidMount() {
        this.setState({landingData: FAKE_DATA});
        let token = localStorage.getItem("token");
        if(token != null){
            this.setState({isLogin: true})
        }
        else{
            this.setState({isLogin:false})
        }
    };

    render() {
        let {landingData} = this.state;
        if(!landingData){
            return(
                <p>
                    loading...
                </p>
            )
        }
        console.log("render");
        console.log(landingData.menu);
        return(
            <>
                <NavHeader isLogin={this.state.isLogin}/>
                {/*<HomeLanding/>*/}
                <MenuSection menu={landingData?.menu}/>
            </>

        )
    }

}


export default Home;