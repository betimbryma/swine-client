import React, {Component, Fragment} from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import moment from "moment";
import Radio from "@material-ui/core/Radio";
import axios from "axios";
import { DateTimePicker } from "material-ui-pickers";
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import * as PropTypes from "prop-types";
import {connect} from "react-redux";

class CollectiveBasedTask extends Component {

    state = {
        startDate: new Date(),
        openCall: false,
        taskRequest: "",
        name: "",
        provisionTimeout: 0,
        compositionTimeout: 0,
        negotiationTimeout: 0,
        executionTimeout: 0,
        qualityAssuranceTimeout: 0,
        qualityAssurance: false,
        ether: 0,
        newCollective: false,
        privateKey: "",
        qaCollective: true,
        unit: "ether",
        queries: [{key: "", value: ""}],
        qor: 0,
        quantity: 0
    };

    componentDidMount() {
        this.setState({pigletId: this.props.cbt.pigletId})
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    onDateChange = (date) => {
        this.setState({startDate: date._d});
    };

    timeouts = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    openCall = () => {
        this.setState({openCall: !this.state.openCall})
    };

    unit = (unit) => {
        this.setState({unit: unit});
    };

    onSubmit = () => {
        const dto = {...this.state};
        axios.post("/api/execution/save", dto)
            .then(() => {
                this.props.history.push("/");
            }).catch(e => {
                console.log(e);
        })
    };

    removeQuery = (index) => {
        let queries = [...this.state.queries];
        queries.splice(index,1);
        this.setState({queries: queries});
    };

    newQuery = () => {
        let queries = [...this.state.queries];
        queries.push({key: "", value: ""});
        this.setState({queries: queries});
    };

    queryUpdate = (event, index) => {
        let queries = [...this.state.queries];
        let query = queries[index];

        query[event.target.name] = event.target.value;
        this.setState({queries: queries});
    };

    render() {
        moment.locale("de");
        return(
            <div className={"jumbotron"}>
                <div className={"container"}>
                    <div className="row">
                        <div className="col">
                            <div className="col float-left">
                                <h1 className="display-4  align-top">Collective Based Task</h1>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-7">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">cbt's name</span>
                                </div>
                                <input type={"text"} className={"form-control"} placeholder={"Collective Based Task's name"}
                                       name={"name"} onChange={(event) => this.onChange(event)}/>
                            </div>
                        </div>
                        <div className="col">
                            <MuiPickersUtilsProvider utils={MomentUtils}>

                                <div className="picker">
                                    <DateTimePicker
                                        value={this.state.startDate}
                                        onChange={(event) => this.onDateChange(event)}
                                        helperText="Clear Initial State"
                                        disablePast
                                        name={"startDate"}
                                    />
                                </div>

                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="col">
                            <FormGroup row className={"float-right"}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.openCall}
                                            onChange={this.openCall}
                                            name={"openCall"}
                                        />
                                    }
                                    label="Open Call"
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">task request</span>
                                </div>
                                <textarea className={"form-control"}
                                          name={"taskRequest"} onChange={(event) => this.onChange(event)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <div className="input-group">
                                <input type={"text"} className={"form-control"} placeholder={"provision timeout (m)"}
                                       name={"provisionTimeout"} onChange={(event) => this.timeouts(event)}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group">
                                <input type={"text"} readOnly={!this.state.openCall} className={"form-control"} placeholder={"composition timeout (m)"}
                                       name={"compositionTimeout"} onChange={(event) => this.timeouts(event)}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group">
                                <input type={"text"} className={"form-control"} placeholder={"negotiation timeout (m)"}
                                       name={"negotiationTimeout"} onChange={(event) => this.timeouts(event)}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group">
                                <input type={"text"} className={"form-control"} placeholder={"execution timeout (m)"}
                                       name={"executionTimeout"} onChange={(event) => this.timeouts(event)}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group">
                                <input type={"text"} className={"form-control"} placeholder={"qual. a. timeout (m)"}
                                       name={"qualityAssuranceTimeout"} onChange={(event) => this.timeouts(event)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <br/>
                            <div style={{height: "100px", overflowY: "auto"}}>
                                {this.state.queries.map((query, index) => {
                                    return (
                                        <div className="input-group" key={index} style={{marginTop: "5px"}}>
                                            <div className="input-group-prepend">
                                                <input type={"text"} className="input-group-text" placeholder={"key"} value={query.key} name={"key"}
                                                       onChange={(event) => this.queryUpdate(event, index)}/>
                                            </div>
                                            <input type={"text"} className={"form-control"} placeholder={"value"} value={query.value}
                                                   name={"value"} onChange={(event) => this.queryUpdate(event, index)}/>
                                            <div className="input-group-append">
                                                <button className={"float-right btn btn-outline-danger btn-sm"} onClick={() => this.removeQuery(index)}>x</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <br/>
                            <button className={"float-right btn btn-outline-dark"} onClick={this.newQuery}>new Query</button>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <h2>Quality Assurance</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <FormControlLabel value="a" control={<Radio
                                checked={!this.state.qaCollective}
                                onChange={() => this.setState({qaCollective: false})}
                                name="qaCollective"
                            />} label="the user will do the quality assurance" />
                            <FormControlLabel value="b" control={<Radio
                                checked={this.state.qaCollective}
                                onChange={() => this.setState({qaCollective: true})}
                                name="qaCollective"
                            />} label="create a separate CBT" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">QoR</span>
                                </div>
                                <input type={"text"} className={"form-control"} placeholder={"enter a number between 0 and 1"}
                                       name={"qor"} onChange={(event) => this.onChange(event)}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Ξ</span>
                                </div>
                                <input type="text" className="form-control" name={"quantity"} onChange={(event) => this.onChange(event)}/>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">wei</span>
                                </div>
                        </div>
                        </div>
                        <div className="col">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">private key</span>
                                </div>
                                <input type={"password"} className={"form-control"} placeholder={"enter your private key here"}
                                       name={"privateKey"} onChange={(event) => this.onChange(event)}/>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 align-right">
                        <div className="col align-right">
                            <button onClick={this.onSubmit} className={"float-right btn btn-dark btn-lg"}>save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CollectiveBasedTask.propTypes = {
    cbt: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    cbt: state.cbt
});

export default connect(mapStateToProps)(CollectiveBasedTask);