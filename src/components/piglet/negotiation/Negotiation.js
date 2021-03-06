import React, {Component} from "react";
import axios from "axios";

class Negotiation extends Component {

    state = {
        id: "",
        name: "Are you interested to participate in this task?",
        done: false,
        taskRequest: "",
        agreed: false,
        missing: false
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(`/api/negotiation/${id}`)
            .then(res => {
                const neg = res.data;
                console.log(neg);
                this.setState({id: neg.negotiationID, done: neg.done, taskRequest: neg.taskRequest
                    , agreed: neg.agreed});
            }).catch(e => {
                this.setState({name: "Negotiation not found", missing: true})
        });
    };

    onSubmit = (agree) => {
        this.setState({agree: agree});
        axios.post("/api/negotiation/negotiate",
            {id: this.state.id, agreed: agree})
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
                    {!this.state.missing ?
                        <div className="col">
                            <button type="button" disabled={this.state.done}
                                    className={`btn float-right ${(this.state.done && this.state.agreed) ? "btn-success" : "btn-outline-success"}`}
                                    style={{marginLeft: "5px", marginTop: "10px"}}
                                    onClick={() => this.onSubmit(true)}>Participate
                            </button>
                            <button type="button" disabled={this.state.done}
                                    className={`btn float-right ${(this.state.done && !this.state.agreed) ? "btn-danger" : "btn-outline-danger"}`}
                                    style={{marginTop: "10px"}} onClick={() => this.onSubmit(false)}>Decline
                            </button>
                        </div> : null
                    }
                </div>
            </div>
        );
    };
}

export default Negotiation;