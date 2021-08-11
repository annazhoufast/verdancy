import React, {Component, useState} from 'react';
import {Card, Button, Row, Col, Modal, Form, Container} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NumericInput from 'react-numeric-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lgShow: false,
            quant: 0,
            auth: localStorage.getItem("Authorization"),
            total: this.props.quantity,
            co2: this.props.co2,
            totalCO2: this.props.totCarbon,
            inGarden: true
        }
    }
    updateQ = quant => this.setState({ quant: quant });

    deletePlant = async (e) => {
        const response = await fetch("https://verdancy.capstone.ischool.uw.edu/v1/UserPlants/" + this.props.pID, {
            method: "DELETE",
            headers: new Headers({
                "Authorization": this.state.auth
            })
        });
        if (response.state > 201) {
            console.log(response.text());
            return;
        }
        this.setState({inGarden: false});
    }

    updatePlantQuantity = async (e) => {
        e.preventDefault();
        console.log("hello");
        // this.setState({lgShow: false});
        const {quant} = this.state;
        console.log(quant);
        // const auth = localStorage.getItem("Authorization");
        const sendData = {
            Quantity: quant
        };
        console.log(this.props.authHeader);
        console.log(this.props.pID);
        const response = await fetch("https://verdancy.capstone.ischool.uw.edu/v1/UserPlants/" + this.props.pID, {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: new Headers({
                "Authorization": this.state.auth,
                "Content-Type": "application/json"
            })
        });
        if (response.status > 201) {
            const error = response.text();
            // this.setState({error:}));
            console.log(error);
            return;
        }
        let newTotal = this.state.total + quant;
        let newCarbon = this.state.co2 * newTotal;
        this.setState({
            lgShow: false,
            total: newTotal,
            totalCO2: newCarbon

        });
        // window.location.reload(true);
        const respMessage = await response.body;
        console.log(quant);
        console.log(response);
    }

    render() {
        console.log(this.state.quant)
        const linkToPlant = "/plant/" + this.props.id;
        if (this.state.inGarden) {
        return (
            <Col lg={6} className="harvest-card">
                <Container className="outline">
                    <Row>
                        <Col lg={5}>
                            {/* <img src="https://raw.githubusercontent.com/annazhoufast/plantastic/main/data/imgs/tomatoe.png?token=ALLXA23MPOVXSKYWA7DGQXTAULINM"
                                alt="drawing of plant" className="garden-img" /> */}
                            <Link to={linkToPlant}>
                                <img src={this.props.img} alt="drawing of plant" className="garden-img" />
                            </Link>
                        </Col>
                        <Col lg={7} className="harvest">
                            <Row>
                                <Col>
                                    <Link id="plant-title" className="link" to={linkToPlant}>
                                        <h3>{this.props.pName}</h3>
                                    </Link>
                                    {/*<span font-size-16><b>{this.props.pName}</b></span>*/}
                                </Col>
                                <Col>
                                    <Button id="remove-plant" onClick={(e) => this.deletePlant(e)} block className="cream-button">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </Col>
                            </Row>
                            <span className="font-size-14"><b>Total Harvested</b></span>
                            <br />
                            {/* <p>{this.props.quantity}</p> */}
                            <span className="font-size-14">{this.state.total}</span>
                            <br />
                            <br />
                            <span className="font-size-14"><b>Total Emissions Saved</b></span>
                            <br />
                            {/* <p>{this.props.totCarbon} g</p> */}
                            <span className="font-size-14">{this.state.totalCO2} gCO2e</span>
                            <br />
                            <br />
                            <Button onClick={() => this.setState({lgShow: true})} block variant="success">Harvest</Button>
                            <Modal
                                size="lg"
                                show={this.state.lgShow}
                                onHide={() => this.setState({lgShow: false})}
                                aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <Modal.Header className="centered" closeButton>
                                    <b>How many {this.props.pName} are you harvesting?</b>
                                </Modal.Header>
                                <Modal.Body>
                                    <Container id="confirm-harvest">
                                        <NumericInput min={0} value={this.state.quant} onChange={this.updateQ} />
                                        <br />
                                        <Button id="confirm-button" variant="success" size="lg" onClick={(e) => this.updatePlantQuantity(e)}>
                                            Harvest {this.state.quant} {this.props.pName}?
                                        </Button>
                                    </Container>
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </Col>
        )
                                            } else {
                                                return (<div />)
                                            }
                                        }
}
export default Plant;
