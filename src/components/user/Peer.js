import React, {Component} from "react";

class Peer extends Component {

    state = {
        name: "",
        username: "",
        email: "",
        twitter: "",
        ethereumAddress: "",
        password: "",
    };

    render() {
        return (
            <div className={"jumbotron"}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="col float-left">
                                <h1 className="display-3  align-top">hi there, {this.state.name}.</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">username</span>
                            </div>
                            <input type="text" className="form-control" placeholder="enter your Username"
                                   value={this.state.username}/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">email address</span>
                            </div>
                            <input type="text" className="form-control" placeholder="enter the email address"
                                   value={this.state.email}/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">@</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.twitter} placeholder={"enter your twitter handle"}/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">ethereum account address</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.ethereumAddress}
                                   placeholder={"enter your account address"}/>
                        </div>

                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">password</span>
                            </div>
                            <input type="password" className="form-control" value={this.state.password}
                                   placeholder={"enter your account password"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{marginTop: "10px"}}>
                            <button className={"btn btn-outline-dark float-right"}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Peer;