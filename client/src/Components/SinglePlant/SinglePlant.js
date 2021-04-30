import React, {Component, useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import {withRouter, useLocation} from 'react-router-dom';
import { createBrowserHistory } from 'history';





export class SinglePlant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: {},
            auth: localStorage.getItem("Authorization"),
            id: this.props.id
        };
        
    }

    componentDidMount() {
        const response = fetch("https://verdancy.capstone.ischool.uw.edu/v1/plants/" + this.state.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        console.log(response);
    }

    addToGarden = (e) => {
        e.preventDefault();
        console.log(this.props.id);
        const response = fetch("https://verdancy.capstone.ischool.uw.edu/v1/AddPlants/" + this.state.id, {
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

    render() {
        

        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div className="pad-top">
                    <Container>
                        <Row>
                            <Col>
                                <h1 className="plant-name">{items.PlantName}</h1>
                            </Col>
                            <Col className="add">
                                {this.state.auth ? 
                                    <Button variant="primary" size="lg" className="add-button green-btn" onClick={this.addToGarden}>+ add to garden</Button>
                                        :
                                    <div />
                                }
                                
                            </Col>
                        </Row>
                        <Row>
                            <p className="darkgreen-text">{items.CO2PerUnit} g CO2e saved per tomato | Gardening Difficulty: {items.Difficulty} | Zones: {items.ZoneStart} - {items.ZoneEnd} | Height: {items.Height}</p>
                        </Row>
                    </Container>

                    <Container>
                        <Row>
                            <Col lg={7}>
                                <p className="font-size-14">{items.Descr}</p>
                                {/* <p>Height: {items.Height}</p> */}
                                <h3>Plant Care</h3>
                                <hr className="line"></hr>
                                <Container>
                                    <Row>
                                        <p className="font-size-14">Watering: {items.Watering} </p>
                                    </Row>
                                    <Row>
                                        <p className="font-size-14">Sunlight: {items.Sun} </p>
                                    </Row>
                                    <Row>
                                        <p className="font-size-14">Soil: {items.Soil} </p>
                                    </Row>
                                    <Row>
                                        <p className="font-size-14">Timing: {items.WhenToPlant} </p>
                                    </Row>
                                    <Row>
                                        <p className="font-size-14">Feeding: {items.Feeding} </p>
                                    </Row>
                                    <Row>
                                        <p className="font-size-14">Transplanting: {items.Transplanting} </p>
                                    </Row>
                                    <Row>
                                        <p className="font-size-14">Spacing: {items.Spacing} </p>
                                    </Row>
                                    <Row>
                                        <p className="font-size-14">Harvesting: {items.Harvesting} </p>
                                    </Row>
                                </Container>
                            </Col>
                            <Col lg={5}>
                                <img src={items.ImageLink2} alt="pic of plant" className="img-100" />
                                
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}

const ShowTheLocationWithRouter = withRouter(SinglePlant);