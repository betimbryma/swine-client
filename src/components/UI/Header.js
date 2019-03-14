import React, { Component } from "react";

class Header extends Component {

    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark " style={{backgroundColor: "coral"}}>
                 <a className="navbar-brand" href="#">swine</a>
        <div className={"collapse navbar-collapse"}>
            <ul className="navbar-nav">
                <li className={"nav-item"}><a href="#" className={"nav-link"}>home</a></li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className={"nav-item"}><a href="#" className={"nav-link"}>profile</a></li>
                <li className={"nav-item"}><a href="#" className={"nav-link"}>logout</a></li>
            </ul>
        </div>
            </nav>
        )
    }
}

export default Header;