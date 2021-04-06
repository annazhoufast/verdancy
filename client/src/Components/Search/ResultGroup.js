import React, {Component} from 'react';
import {Result} from './Result';

export class ResultGroup extends React.Component {
    render() {
        let r = [];
        for (let i = 0; i < 6; i++) {
            r.push(<Result/>);
        }
        return (
            <div>
                {r}
            </div>
        )
    }
}