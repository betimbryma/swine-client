import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Execution from "./execution/Execution";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCBTs} from "../../store/actions/cbt";
import {COMPOSING, EXECUTING, NEGOTIATING, PROVISIONING, QUALITY_ASSURANCE, SCHEDULED} from "../../cbtStates";

class Piglet extends Component{

    state = {
        value: "1"
    };

    componentDidMount() {
        const {piglet} = this.props.piglet;
        this.props.getCBTs(piglet.id);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    render(){

        const { value } = this.state;
        const { collectiveBasedTasks } = this.props.cbt;
        const {piglet} = this.props.piglet;
        let scheduled = [];
        let provisioning = [];
        let composing = [];
        let negotiating = [];
        let executing = [];
        let qualityAssurance = [];
        let finished = [];

        collectiveBasedTasks.map(cbt => {
            let task = (
                <div className={"row"}>
                    <div className={"col"}>
                        <Execution cbt = {cbt}/>
                    </div>
                </div>
            );
            switch (cbt.state) {
                case SCHEDULED:
                    scheduled.push(task);
                    break;
                case PROVISIONING:
                    provisioning.push(task);
                    break;
                case COMPOSING:
                    composing.push(task);
                    break;
                case NEGOTIATING:
                    negotiating.push(task);
                    break;
                case EXECUTING:
                    executing.push(task);
                    break;
                case QUALITY_ASSURANCE:
                    qualityAssurance.push(task);
                    break;
                default:
                    finished.push(task);
            }
            return task;
        });

        return(
            <div className={"jumbotron"}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card" style={{borderRadius: "5px 5px 0px 0px", backgroundColor: "#263238"}}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{color: "#AA00FF"}}>{piglet.name}</h5>
                                    <p className="card-text" style={{color: "#D500F9"}}>{piglet.description}</p>
                                    <p className="lead align-bottom">
                                        <NavLink to={"/cbt"} className="btn btn-outline-warning">new Collective Based Task</NavLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div >
                                <AppBar position="static" color="default">
                                    <Tabs value={value}
                                          onChange={this.handleChange}
                                          variant="scrollable"
                                          scrollButtons="on"
                                          indicatorColor="primary"
                                          textColor="primary">
                                        <Tab value={"1"} label="scheduled" />
                                        <Tab value={"2"} label="provisioning" />
                                        <Tab value={"3"} label="composing" />
                                        <Tab value={"4"} label="negotiating" />
                                        <Tab value={"5"} label="executing" />
                                        <Tab value={"6"} label="quality assurance" />
                                        <Tab value={"7"} label="finished" />
                                    </Tabs>
                                </AppBar>
                                <br/>
                                {value === '1' && <div> {scheduled} </div>}

                                {value === '2' && <div>
                                    {provisioning}
                                </div>}
                                {value === '3' && <div>
                                    {composing}
                                </div>}
                                {value === '4' && <div>{
                                    negotiating
                                }</div>}
                                {value === '5' && <div>
                                    {executing}
                                </div>}
                                {value === '6' && <div>
                                    {qualityAssurance}
                                </div>}
                                {value === '7' && <div>
                                    {finished}
                                </div>}
                               </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Piglet.propTypes = {
    cbt: PropTypes.object.isRequired,
    piglet: PropTypes.object.isRequired,
    getCBTs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    cbt: state.cbt,
    piglet: state.piglet
});

export default connect(mapStateToProps, {getCBTs})(Piglet);