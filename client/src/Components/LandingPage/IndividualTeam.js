import React, {Component, useState} from 'react';
import {Col} from "react-bootstrap";

export class IndividualTeam extends React.Component {
    render() {
        return (
            <Col lg={3} className="centered">
                <img src={this.props.pfp} alt={this.props.prpAlt} id="team-img" />
                <br />
                <br />
                <p><b>{this.props.name}</b></p>
                <p>{this.props.role}</p>
            </Col>
        )
    }
}
