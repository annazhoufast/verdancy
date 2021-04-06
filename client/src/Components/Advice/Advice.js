import React, {Component} from 'react';
import {AdviceCardGroup} from './AdviceCardGroup';

export class Advice extends React.Component {
    render() {
        return (
            <div>
                <h1>new to gardening?</h1>
                <p>we've got you covered with some beginner's gardening tips!</p>
                <AdviceCardGroup />
            </div>
        )
    }
}