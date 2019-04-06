import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import PigletItem from "../piglet/PigletItem";
import {connect} from "react-redux";
import {getPiglets} from "../../store/actions";
import * as PropTypes from "prop-types";



class Home extends Component {

    componentDidMount() {
        this.props.getPiglets();
    }

    render() {

        const {piglets} = this.props.piglet;

        return (
            <div className={"jumbotron"}>
                <div className="container">
                    <div className="row">
                        <div className="col float-left">
                            <h1 className="display-4  align-top">piglets</h1>
                        </div>
                        <div className="col">
                            <p className="lead float-right align-bottom">
                                <NavLink className={"btn btn-outline-dark"} to={"/newPiglet"}>new piglet</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                {piglets.map(piglet => (
                    <div>
                        <PigletItem pigletItem={piglet}/>
                        <br/>
                    </div>
                ))}
            </div>
        );
    }
}

Home.propTypes = {
    piglet: PropTypes.object.isRequired,
    getPiglets: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    piglet: state.piglet
});

export default connect(mapStateToProps, {getPiglets})(Home);