import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../store/actions";

class Header extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark  " style={{backgroundColor: "#880E4F",
                position: "fixed", zIndex: "99", width:"100%"}}>
                <NavLink className="navbar-brand" to={"/home"}>swine</NavLink>
                {(this.props.security.token !== null) ? <div className={"collapse navbar-collapse"}>
                    <ul className="navbar-nav">
                        <li className={"nav-item"}><NavLink to={"/home"} className={"nav-link"}>home</NavLink></li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className={"nav-item"}><NavLink to={"/profile"} className={"nav-link"}>{this.props.security.peer}</NavLink>
                        </li>
                        <li className={"nav-item"} onClick={this.props.logout}><a className={"nav-link"}>log out</a></li>
                    </ul>
                </div> : null}
            </nav>
        )
    }
}

Header.propTypes = {
    security: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps, {logout})(Header);