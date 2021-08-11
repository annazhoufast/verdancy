import React, {Component, useState} from 'react';
import {Card, Col, Button} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
import { withRouter } from "react-router";
import {SinglePlant} from '../SinglePlant/SinglePlant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChessKing } from '@fortawesome/free-solid-svg-icons'

export class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plantLink: "https://verdancy.capstone.ischool.uw.edu/v1/plants/" + this.props.id,
            auth: localStorage.getItem("Authorization"),
            inGarden: false
        }
    }

    render() {

        const addToGarden = (e) => {
            e.preventDefault();
            console.log(this.props.id);
            const response = fetch("https://verdancy.capstone.ischool.uw.edu/v1/AddPlants/" + this.props.id, {
                method: "POST",
                headers: new Headers({
                    "Authorization": this.state.auth
                })
            });
            if (response.status > 201) {
                const error = response.text();
                console.log(error);
                return;
            }
            this.setState({inGarden: true});
            console.log(response);
        }

        const specificLink = "https://verdancy.capstone.ischool.uw.edu/v1/plants/" + this.props.id;
        const linkToPlant = "/plant/" + this.props.id;
        const {history} = this.props;
        return (
            <Col md={4} xs={12} className="db-plant">
                <Card className="card">
                    <div>
                        <Link to={linkToPlant}>
                            <Card.Img variant="top" src={this.props.image} className="full-img" />
                        </Link>
                    </div>
                    <Card.Body>
                        <Card.Title>
                            <Link id="plant-title" className="link" to={linkToPlant}>
                                <h3>{this.props.pName}</h3>
                            </Link>
                        </Card.Title>
                        <Card.Text id="plant-preview">
                            <p className="font-size-14"><i>{this.props.pSName}</i></p>
                            <p className="font-size-14"><b>Difficulty:</b> {this.props.difficulty}</p>
                        </Card.Text>
                        {/* COME BACK AND DEAL W/ THIS */}
                        {this.state.inGarden ? <Button className="search-button" variant="success">
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        : <Button className="search-button" variant="outline-success" onClick={addToGarden}>+ add to garden</Button>}
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}
