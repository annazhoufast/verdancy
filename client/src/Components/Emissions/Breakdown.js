import React, {Component} from 'react';
import {IndividualBreakdown} from './IndividualBreakdown';

export class Breakdown extends React.Component {
    render() {
        let b = [];
        for (let i = 0; i < 3; i++) {
            b.push(<IndividualBreakdown/>);
        }
        return (
            <div>
                {b}
                <h3>Plantastic! Here's the breakdown...</h3>
            </div>
        )
    }
}