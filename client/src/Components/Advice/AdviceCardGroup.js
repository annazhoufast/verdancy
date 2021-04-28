import React, {Component} from 'react';
import {AdviceCard} from './AdviceCard.js';
import {Row, Container} from 'react-bootstrap';

export class AdviceCardGroup extends React.Component {
    render() {
        // create the cards here
        let cards = [];
        for (let i = 0; i < 6; i++) {
            cards.push(<AdviceCard/>)
        }
        return(
            <div>
                <Row className="card-row">
                  {cards}
                </Row>
            </div>
        )
    }
}
