import React, {Component} from "react";
import axios from "axios";

class ExecutionInstance extends Component {

    state = {
        id: "",
        name: "collective based task",
        request: "task request",
        result: "",
        done: false
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`/api/execution/${id}`)
            .then(res => {
                const exec = res.data;
                console.log(exec);
                this.setState({id: exec.executionId, name: exec.name, request: exec.request,
                    result: exec.result, done: exec.done});
                console.log(this.state.id);
            }).catch(e => {
                this.setState({done: true, name: "collective based task not found", request: ""});
        });
    };

    onSubmit = () => {
        axios.post("/api/execution/execute",
            {executionId: this.state.id, result: this.state.result})
            .then(() => {
                this.setState({done: true});
            }).catch(e => {
                console.log(e);
        });
    };

    onChange = (event) => {
        this.setState({result: event.target.value});
    };

    render() {
        return(
            <div className={"jumbotron"}>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{this.state.name}</h5>
                            <p className="card-text">{this.state.request}</p>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Task Result</span>
                                </div>
                                <textarea className="form-control" value={this.state.result} readOnly={this.state.done}
                                onChange={(e) => this.onChange(e)}/>
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