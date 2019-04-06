import React, {Component} from "react";
import axios from "axios";

class ExecutionInstance extends Component {

    state = {
        id: "",
        name: "name",
        taskRequest: "task request",
        taskResult: "",
        done: false
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`/api/execution/${id}`)
            .then(res => {
                const {exec} = res.data;
                this.setState({id: exec.id, name: exec.name, taskRequest: exec.taskRequest});
            }).catch(e => {
                console.log(e);
        });
    };

    onSubmit = () => {
        axios.post("/api/execution/",
            {id: this.state.id, taskResult: this.state.taskResult})
            .then(() => {
                this.setState({done: true});
            }).catch(e => {
                console.log(e);
        });
    };

    render() {
        return(
            <div className={"jumbotron"}>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{this.state.name}</h5>
                            <p className="card-text">{this.state.taskRequest}</p>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Task Result</span>
                                </div>
                                <textarea className="form-control" placeholder="Amount in ether" readOnly={!this.state.done}/>
                            </div>
                            <button className="btn float-right btn-outline-dark"
                                    disabled={this.state.done} onClick={this.onSubmit}>send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExecutionInstance;