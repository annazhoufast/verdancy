import React, {Component, useState} from 'react';
import {Card, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

export class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plantLink: ""
        }
    }
    render() {
        const handleClick = () => {
            // this.props.callback(this.props.PlantID)
            // this.setState(this.state.plantID = this.props.id)
            this.state.plantLink = specificLink
            console.log(this.state.plantLink)
        }
        const specificLink = "https://verdancy.capstone.ischool.uw.edu/v1/plants/" + this.props.id;
        return (
            <Col md={4} xs={12} className="db-plant">
                <Card className="card">
                    <div>
                        <Card.Img variant="top" src={this.props.image} className="full-img" />
                        {/* COME BACK AND DEAL W/ THIS */}
                        {/* <Button variant="outline-success">+</Button> */}
                    </div>
                    <Card.Body>
                        <Card.Title onClick={handleClick}>
                            {/* <a href={specificLink}>{this.props.pName}</a> */}
                            {/* <Link to="/plant/">{this.props.pName}</Link> */}
                            <h3>{this.props.pName}</h3>
                        </Card.Title>
                        <Card.Text>
                            <i>{this.props.pSName}</i>
                            <br/>
                            Difficulty: {this.props.difficulty}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}