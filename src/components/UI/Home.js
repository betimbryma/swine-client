import React, {Component} from "react";

class Home extends Component {

    render() {
        return (
            <div className={"jumbotron"}>

                <div className="container">
                    <div className="row">
                        <div className="col float-left">
                            <h1 className="display-4  align-top">piglets</h1>
                        </div>
                        <div className="col">
                            <p className="lead float-right align-bottom">
                                <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                            </p>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="card">
                    <h5 className="card-header">Featured</h5>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional
                            content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;