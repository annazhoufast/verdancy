import React, {Component} from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
// import carrot from '../../../imgs/carrot.png';
import carrot from '../../../imgs/carrot.png'

export class PleaseSignIn extends React.Component {
    render() {
        return(
          <section>
            <div className="container" id="please-sign-in">
                <h2>uh oh!</h2>
                <p>It looks like you need to be signed into an account to view this page!</p>
                <p>Please <Link to="/signup" className="link"><b>create an account</b></Link>,
                or <Link to="/signin" className="link"><b>sign in</b></Link> if you already have one.</p>
                <div className="centered">
                  <img src={carrot}
                  alt="sad carrot"/>
                </div>
            </div>
          </section>
        )
    }
}
