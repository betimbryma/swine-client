import React, {Component} from "react";
import axios from "axios";

class Execution extends Component{

    state = {
        done: false
    };

    onCancel = (execution) => {
        axios.put("/api/execution/", execution)
            .then(() => {
                this.setState({done: true});
            }).catch(e => {
                console.log(e);
        })
    };

    render() {

        const {execution} = this.props;

        return (
            <div className="card" style={{marginBottom: "10px"}}>
                <div className="card-header" style={{backgroundColor: "#cc7832"}}>
                   Scheduled
                </div>
                <div className="card-body" style={{backgroundColor: "#263238"}}>
                    <h5 className="card-title" style={{color: "#AA00FF"}}>{execution.name}</h5>
                    <p className="card-text" style={{color: "#D500F9"}}>{execution.taskRequest}</p>
                    <p className="card-text" style={{color: "#FF1744"}}>{execution.type}</p>
                    <p className="card-text" style={{color: "#FF1744"}}>{`${execution.startDate}-${execution.endDate}`}</p>
                    <p className="card-text" style={{color: "#FF1744"}}>{execution.taskResult}</p>
                    <button className="btn btn-outline-danger" disabled={execution.done}
                        onClick={() => this.onCancel(execution)}>Cancel</button>
                </div>
            </div>
        );
    };
}

export default Execution;