import React, {Component} from "react";
import axios from "axios";

class QualityAssurance extends Component {

    state = {
        name: "Please rate the task result of a collective based task",
        taskRequest: "",
        score: 0,
        voted: false,
        results: [],
        id: "",
        disabled: true
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`/api/qualityassurance/${id}`)
            .then(res => {
                const qa = res.data;
                this.setState({name: qa.name, taskRequest: qa.taskRequest,
                    disabled: qa.voted, score: qa.score, done: qa.done, id: qa.qualityAssuranceId});
            }).catch(e => {
                this.setState({name: "Oops, you are not part of the collective."});
        });
    };

    onSubmit = () => {
        axios.post("/api/qualityassurance/",
            {id: this.state.id, vote: this.state.score})
            .then(() => {
                this.setState({disabled: true})
            }).catch(e => {
                console.log(e);
        })
    };

    rate = (score) => {
        this.setState({score: score})
    };

    render() {
        return (
            <div className={"jumbotron"}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.state.name}</h5>
                        <div className="input-group mb-3">

                            <textarea className="form-control" readOnly value={this.state.taskRequest}
                                style={{height: "250px"}}/>
                            <div className="input-group-prepend">
                                <span className="input-group-text">rate this Task Result</span>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                        data-toggle="dropdown" disabled={this.state.disabled}>{this.state.score}
                                </button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" onClick={() => this.rate("0")}>0</button>
                                    <button className="dropdown-item" onClick={() => this.rate("1")}>1</button>
                                    <button className="dropdown-item" onClick={() => this.rate("2")}>2</button>
                                    <button className="dropdown-item" onClick={() => this.rate("3")}>3</button>
                                    <button className="dropdown-item" onClick={() => this.rate("4")}>4</button>
                                    <button className="dropdown-item" onClick={() => this.rate("5")}>5</button>
                                    <button className="dropdown-item" onClick={() => this.rate("6")}>6</button>
                                    <button className="dropdown-item" onClick={() => this.rate("7")}>7</button>
                                    <button className="dropdown-item" onClick={() => this.rate("8")}>8</button>
                                    <button className="dropdown-item" onClick={() => this.rate("9")}>9</button>
                                    <button className="dropdown-item" onClick={() => this.rate("10")}>10</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={this.onSubmit} disabled={this.state.disabled} className="btn float-right btn-outline-dark">send</button>
                    </div>
                </div>
            </div>
        );
    };
};

export default QualityAssurance;