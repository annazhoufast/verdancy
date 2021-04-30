import React, {Component, useState} from 'react';
import {Card, Col, Button} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
import { withRouter } from "react-router";
import {SinglePlant} from '../SinglePlant/SinglePlant';
import "bootstrap/dist/css/bootstrap.min.css";

export class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plantLink: "https://verdancy.capstone.ischool.uw.edu/v1/plants/" + this.props.id,
            auth: localStorage.getItem("Authorization"),
            inGarden: false
        }
        // console.log(this.props.id)
        // console.log(this.state.auth.length)
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

        const handleClick = () => {
            // this.state.plantLink = specificLink
            // console.log(this.state.plantLink)
            // localStorage.setItem("PlantLink", specificLink);
            this.setState({plantLink: specificLink});
        }
        const specificLink = "https://verdancy.capstone.ischool.uw.edu/v1/plants/" + this.props.id;
        const linkToPlant = "/plant/" + this.props.id;
        return (
            <Col md={4} xs={12} className="db-plant">
                <Card className="card">
                    <div>
                        <Card.Img variant="top" src={this.props.image} className="full-img" />
                        {/* COME BACK AND DEAL W/ THIS */}
                        {this.state.auth !== null ? <Button variant="outline-success" onClick={addToGarden}>+</Button>: <div/>}
                    </div>
                    <Card.Body>
                        <Card.Title onClick={handleClick}>
                            {/* <a href={specificLink}>{this.props.pName}</a> */}
                            {/* <Link to="/plant/">{this.props.pName}</Link> */}
                            <Link to={linkToPlant}>
                                <h3>{this.props.pName}</h3>
                            </Link>
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