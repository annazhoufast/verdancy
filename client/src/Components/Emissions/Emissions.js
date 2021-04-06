import React, {Component} from 'react';
import {Breakdown} from './Breakdown';

export class Emissions extends React.Component {
    render() {
        return (
            <div>
                <h1>my emissions</h1>
                <h1> 30,750 g CO2e Saved</h1>
                <Breakdown/>
            </div>
        )
    }
}