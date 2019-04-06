import React, {Component} from "react";
import {connect} from "react-redux";
import {authenticate} from "../../store/actions";
import * as PropTypes from "prop-types";

class Authenticate extends Component {

    state = {
        id: "",
        email: "",
        address: "",
        role: "",
        location: "",
        password: "",
        button: "login"
    };

    componentDidMount() {
        if(this.props.security.token !== null)
            this.props.history.push("/");
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmit = () => {
        if (this.state.button === "login")
            this.setState({button: "register"});
        else
            this.setState({button: "login"});
    };

    authentication = () => {
        console.log("3");
        const dto = {
            id: this.state.id,
            email: this.state.email,
            address: this.state.address,
            role: this.state.role,
            location: this.state.location,
            password: this.state.password,
            button: "login"
        };

        this.props.authenticate(dto, this.state.button, this.props.history);
    };

    render() {
        return (
            <div className={"jumbotron"}>
                <div className="container">
                    <div className="row">
                        <div className="col float-left">
                            <h1 className="display-4  align-top">welcome to swine</h1>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">username</span>
                                </div>
                                <input type={"text"} className={"form-control"} placeholder={"enter your username here"}
                                       name={"id"} onChange={(event) => this.onChange(event)}/>
                            </div>
                        </div>
                    </div>
                    {(this.state.button === "register") ? (
                        <div>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">email address</span>
                                        </div>
                                        <input type={"text"} className={"form-control"}
                                               placeholder={"enter your email address here"}
                                               name={"email"} onChange={(event) => this.onChange(event)}/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">ethereum address</span>
                                        </div>
                                        <input type={"text"} className={"form-control"}
                                               placeholder={"enter your ethereum address here"}
                                               name={"address"} onChange={(event) => this.onChange(event)}/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">location</span>
                                        </div>
                                        <input type={"text"} className={"form-control"}
                                               placeholder={"enter your location here"}
                                               name={"location"} onChange={(event) => this.onChange(event)}/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">role</span>
                                        </div>
                                        <input type={"text"} className={"form-control"}
                                               placeholder={"enter your role here"}
                                               name={"role"} onChange={(event) => this.onChange(event)}/>
                                    </div>
                                </div>
                            </div>
                        </div>) : null}
                    <br/>
                    <div className="row">
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">password</span>
                                </div>
                                <input type={"password"} className={"form-control"}
                                       placeholder={"enter your password here"}
                                       name={"password"} onChange={(event) => this.onChange(event)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 align-right">
                        <div className="col">
                            <p onClick={this.onSubmit}>I would like to {this.state.button === "login" ? "register" : "login"}</p>
                        </div>
                        <div className="col align-right">
                            <button onClick={this.authentication}
                                    className={"float-right btn btn-dark btn-lg"}>{this.state.button}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Authenticate.propTypes = {
    authenticate: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps, {authenticate})(Authenticate);