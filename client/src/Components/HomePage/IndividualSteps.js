import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

export class IndividualSteps extends React.Component {
    render() {
        return (
            <Col lg={4} className="centered">
                <img src={this.props.img} alt={this.props.alt} className="individ-step"/>
                <br/>
                <br/>
                <p><b>{this.props.title}</b></p>
                <div className="individ-step">
                  <p>{this.props.description}</p>
                </div>
            </Col>
        )
    }
}
