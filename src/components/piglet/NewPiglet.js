import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {newPiglet} from "../../store/actions/piglet";


class NewPiglet extends Component{

    state = {
        name: "",
        description: ""
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmit = () => {
        this.props.newPiglet(
            {name: this.state.name, description: this.state.description},
            this.props.history
        );
    };

    render() {
        return(
            <div className={"jumbotron"}>
                <div className={"container"}>
                    <div className="row">
                        <div className="col">
                            <div className="col float-left">
                                <h1 className="display-4  align-top">new piglet</h1>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">name</span>
                                </div>
                                <input type={"text"} className={"form-control"} placeholder={"piglet's name"}
                                       name={"name"} onChange={(event) => this.onChange(event)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">description</span>
                                </div>
                                <textarea className={"form-control"}
                                          name={"description"} onChange={(event) => this.onChange(event)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 align-right">
                        <div className="col align-right">
                            <button className={"float-right btn btn-outline-dark"} onClick={this.onSubmit}>save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

NewPiglet.propTypes = {
    newPiglet: PropTypes.func.isRequired
};

export default connect(null, {newPiglet})(NewPiglet);