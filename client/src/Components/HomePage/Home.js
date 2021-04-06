import React, {Component} from 'react';
import {Steps} from './Steps';
import {Team} from './Team';

export class Home extends React.Component {
    render() {
        return (
            <body>
                <Steps />
                <Team />
            </body>
        )
    }
}
