import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';

export class Plant extends React.Component {
    render() {
        return (
            <Card>
                <Card.Title>Tomato</Card.Title>
                <Button>Harvest!</Button>
            </Card>
        )
    }
}