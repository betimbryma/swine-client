import React, {Component} from 'react';

import Header from "./components/UI/Header";
import Home from "./components/UI/Home";
import {BrowserRouter, Redirect} from "react-router-dom";
import {Route, Switch} from "react-router";
import NewPiglet from "./components/piglet/NewPiglet";
import Piglet from "./components/piglet/Piglet";
import CollectiveBasedTask from "./components/piglet/collectivebasedtask/CollectiveBasedTask";
import QualityAssurance from "./components/piglet/qualityAssurance/QualityAssurance";
import Negotiation from "./components/piglet/negotiation/Negotiation";
import ExecutionInstance from "./components/piglet/execution/ExecutionInstance";
import Peer from "./components/user/Peer";
import Authenticate from "./components/UI/Authenticate";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";

class App extends Component {

    render() {
        let routes = <Route to={"/"} component={Authenticate}/>;

        if (this.props.security.token !== null) {
            routes = (
                <Switch>
                    <Route path={"/newPiglet"} component={NewPiglet}/>
                    <Route path={"/piglet/:id"} component={Piglet}/>
                    <Route path={"/cbt"} component={CollectiveBasedTask}/>
                    <Route path={"/qualityAssurance/:id"} component={QualityAssurance}/>
                    <Route path={"/negotiation/:id"} component={Negotiation}/>
                    <Route path={"/execution/:id"} component={ExecutionInstance}/>
                    <Route path={"/profile"} component={Peer}/>
                    <Route path={"/"} component={Home}/>
                    <Redirect to={"/"}/>
                </Switch>
            );
        }


        return (
            <BrowserRouter>
                <Header/>
                <div className="container" >
                    <div className="row justify-content-md-center" >
                        <div className="col" style={{marginTop: "90px"}}>
                            {routes}
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

App.propTypes = {
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps)(App);
