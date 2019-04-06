import React, {Component} from "react";
import axios from "axios";

class Negotiation extends Component {

    state = {
        id: "",
        name: "Name",
        done: false,
        taskRequest: "Task request",
        agreed: false
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`/api/negotiation/${id}`)
            .then(res => {
                const {neg} = res.data;
                this.setState({id: neg.id, name: neg.name, done: neg.done, taskRequest: neg.taskRequest
                    , agreed: neg.agreed});
            }).catch(e => {
                console.log(e);
        });
    };

    onSubmit = (agree) => {
        this.setState({agree: agree});
        axios.post("/api/negotiation",
            {id: this.state.id, agree: agree})
            .then(() => {
                this.setState({done: true});
            }).catch(e => {
                console.log(e);
        });
    };

    render() {
        return(
            <div className={"jumbotron"}>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.name}</h5>
                                <p className="card-text">{this.state.taskRequest}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="button" className={`btn btn-outline-success float-right ${(this.state.done && this.state.agreed) ? "btn-success" : ""}`}
                            style={{marginLeft: "5px", marginTop: "10px"}} onClick={() => this.onSubmit(true)}>Participate</button>
                        <button type="button" className={`btn btn-outline-danger float-right ${(this.state.done && !this.state.agreed) ? "btn-danger" : ""}`}
                                style={{marginTop: "10px"}} onClick={() => this.onSubmit(false)}>Decline</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default Negotiation;