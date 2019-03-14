import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/UI/Header";
import Home from "./components/UI/Home";

class App extends Component {
  render() {
    return (
        <div>
        <Header/>
        <br/>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                        <Home/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
