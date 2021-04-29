import React, {Component} from 'react';
import {Card} from 'react-bootstrap';

export class AdviceCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cardContent: "hello i am a card"
        };
    }

    render() {
        return (
            <Card className="cream-background centered" id="advice-card"
            onMouseEnter={() => {this.onMouseEnter();}} onMouseOut={() => {this.onMouseOut();}}>
                <h3 id="adviceTitle">{this.state.cardContent}</h3>
            </Card>
        )
    }

    onMouseEnter= () => {
        this.setState({
          cardContent: "advice wow"
        })
    }

    onMouseOut= () => {
        this.setState({
          cardContent: "hello i am a card"
        })
    }
}
