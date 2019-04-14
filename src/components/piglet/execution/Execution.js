import React, {Component} from "react";
import axios from "axios";
import {CANCELLED, FAILED, FINISHED} from "../../../cbtStates";

class Execution extends Component{

    state = {
        done: false
    };

    onCancel = (execution) => {
        execution.executionId = execution.id;
        axios.put("/api/execution/", execution)
            .then(() => {
                this.setState({done: true});
            }).catch(e => {
                console.log(e);
        })
    };

    render() {

        const {execution} = this.props;
        const backgroundColor = this.props.done ? "#474747" : "#cc7832";
        const cardColor = this.props.done ? "#606060" : "#263238";

        return (
            <div className="card" style={{marginBottom: "10px"}}>
                <div className="card-header" style={{backgroundColor: backgroundColor}}>
                    {execution.state}
                </div>
                <div className="card-body" style={{backgroundColor: cardColor}}>
                    <h5 className="card-title" style={{color: "#AA00FF"}}>{execution.name}</h5>
                    <p className="card-text" style={{color: "#D500F9"}}>{execution.taskRequest}</p>
                    <p className="card-text" style={{color: "#FF1744"}}>{execution.type}</p>
                    <p className="card-text" style={{color: "#FF1744"}}>{`${execution.startDate}-${execution.endDate}`}</p>
                    <p className="card-text" style={{color: "#FF1744"}}>{execution.taskResult}</p>
                    {(this.props.done || execution.state === FINISHED || execution.state === FAILED  || execution.state === CANCELLED ) ? null : <button className="btn btn-outline-danger" disabled={execution.done}
                        onClick={() => this.onCancel(execution)}>Cancel</button>}
                </div>
            </div>
        );
    };
}

export default Execution;