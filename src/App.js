import React, { Component } from 'react';
import Converter from './components/Converter';
import './styles/App.less';

class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="container">
                <div className="row center">
                    <h1>JSX TRANS</h1>
                </div>
                <div className="row center">
                    <h2>Convert Jsx to Html</h2>
                </div>
                <div className="row">
                    <Converter />
                </div>

            </div>
        );
    }
}

export default App;
