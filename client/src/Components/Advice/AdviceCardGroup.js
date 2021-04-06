import React, {Component} from 'react';
import {AdviceCard} from './AdviceCard.js';

export class AdviceCardGroup extends React.Component {
    render() {
        // create the cards here
        let cards = [];
        for (let i = 0; i < 6; i++) {
            cards.push(<AdviceCard/>)
        }
        return(
            // <h1>hello I am a group of advice cards</h1>
            <div>
                {cards}
            </div>
        )
    }
}