import React, {Component, useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import {withRouter, useLocation} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faSun, faSpa, faClock, faHandHoldingHeart, faDolly, faRuler, faSeedling, faCheck } from '@fortawesome/free-solid-svg-icons'

export class SinglePlant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: {},
            auth: localStorage.getItem("Authorization"),
            id: this.props.id,
            inGarden: false
        };

    }

    componentDidMount() {

        window.scrollTo(0, 0)
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
                <section>
                  <div className="container">
                      <Container>
                          <Row>
                              <Col>
                                  <h2>{items.PlantName}</h2>
                              </Col>
                              <Col className="add-more">
                                  {this.state.inGarden ?
                                    <Button variant="success" size="lg" className="add-button" variant="success">
                                        <FontAwesomeIcon icon={faCheck} /> added to Garden
                                    </Button>
                                      :
                                      <Button variant="success" size="lg" className="add-button" variant="success" onClick={this.addToGarden}>+ add to garden</Button>
                                  }

                              </Col>
                          </Row>
                          <Row>
                              <p className="darkgreen-text"><b>{items.CO2PerUnit} gCO2e</b> saved per unit | <b>Gardening Difficulty:</b> {items.Difficulty} | <b>Zones:</b> {items.ZoneStart} - {items.ZoneEnd} | <b>Height:</b> {items.Height} inches</p>
                          </Row>
                      </Container>

                      <Container id="plant-info">
                          <Row>
                              <Col lg={7}>
                                  <p className="font-size-14">{items.Descr}</p>
                                  {/* <p>Height: {items.Height}</p> */}
                                  <h3>Vegetable Care</h3>
                                  <hr className="line"></hr>
                                  <Container>
                                      <Row>
                                          <p className="font-size-14"><FontAwesomeIcon icon={faTint} className="care-icon" /><b> Watering:</b> {items.Watering} </p>
                                      </Row>
                                      <Row>
                                          <p className="font-size-14"><FontAwesomeIcon icon={faSun} className="care-icon" /><b>Sunlight:</b> {items.Sun} </p>
                                      </Row>
                                      <Row>
                                          <p className="font-size-14"><FontAwesomeIcon icon={faSpa} className="care-icon" /><b>Soil:</b> {items.Soil} </p>
                                      </Row>
                                      <Row>
                                          <p className="font-size-14"><FontAwesomeIcon icon={faClock} className="care-icon" /><b>Timing:</b> {items.WhenToPlant} </p>
                                      </Row>
                                      <Row>
                                          <p className="font-size-14"><FontAwesomeIcon icon={faHandHoldingHeart} className="care-icon" /><b>Feeding:</b> {items.Feeding} </p>
                                      </Row>
                                      <Row>
                                          <p className="font-size-14"><FontAwesomeIcon icon={faDolly} className="care-icon" /><b>Transplanting:</b> {items.Transplanting} </p>
                                      </Row>
                                      <Row>
                                          <p className="font-size-14"><FontAwesomeIcon icon={faRuler} className="care-icon" /><b>Spacing:</b> {items.Spacing} </p>
                                      </Row>
                                      <Row>
                                          <p className="font-size-14"><FontAwesomeIcon icon={faSeedling} className="care-icon" /><b>Harvesting:</b> {items.Harvesting} </p>
                                      </Row>
                                  </Container>
                              </Col>
                              <Col lg={5}>
                                  <img src={items.ImageLink2} alt="pic of plant" id="plant-img" />

                              </Col>
                          </Row>
                      </Container>
                  </div>
                </section>
            )
        }
    }
}

const ShowTheLocationWithRouter = withRouter(SinglePlant);
