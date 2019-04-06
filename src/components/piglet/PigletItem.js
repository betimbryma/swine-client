import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {viewPiglet} from "../../store/actions/piglet";

class PigletItem extends Component {

    onView = () => {
        const {pigletItem} = this.props;
        this.props.viewPiglet(pigletItem, this.props.history);
    };

    render() {

        const {pigletItem} = this.props;

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{pigletItem.name}</h5>
                    <p className="card-text">{pigletItem.description}</p>
                    <button onClick={this.onView} className="btn btn-dark">view</button>
                </div>
            </div>
        )
    }
}

PigletItem.propTypes = {
    piglet: PropTypes.object.isRequired,
    viewPiglet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   piglet: state.piglet
});

export default withRouter(connect(mapStateToProps, {viewPiglet})(PigletItem));