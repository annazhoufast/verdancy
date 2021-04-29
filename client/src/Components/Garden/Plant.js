import React, {Component, useState} from 'react';
import {Card, Button, Row, Col, Modal, Form, Container} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import NumericInput from 'react-numeric-input';


// export class Plant extends React.Component {

// function updateQuant(quant) {
//     this.setState({quant});
// }

// function Plant(props) {
class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lgShow: false,
            quant: 0,
            auth: localStorage.getItem("Authorization")
        }
    }
    updateQ = quant => this.setState({ quant: quant });
    
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
        this.setState({lgShow: false});
        // window.location.reload(true);
        const respMessage = await response.body;
        console.log(quant);
        console.log(response);
    }

    componentDidUpdate() {
        // this.updatePlantQuantity()
    }

    render() {
        console.log(this.state.quant)
    return (
        <Col lg={6} className="harvest-card">
            <Container className="outline">
                <Row>
                    <Col lg={5}>
                        <img src="https://raw.githubusercontent.com/annazhoufast/plantastic/main/data/imgs/tomatoe.png?token=ALLXA25BKVLL7A7AEQS3W3LASHPF6"
                            alt="drawing of plant" className="garden-img" />
                    </Col>
                    <Col lg={7} className="harvest">
                        <h4>
                            <b>{this.props.pName}</b>
                        </h4>
                        <p>Harvest Total</p>
                        <p>{this.props.quantity}</p>
                        <p>Carbon Emissions Saved</p>
                        <p>{this.props.totCarbon} g</p>
                        <Button onClick={() => this.setState({lgShow: true})} block className="green-btn">Harvest!</Button>
                        <Modal
                            size="lg"
                            show={this.state.lgShow}
                            onHide={() => this.setState({lgShow: false})}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <p>How much {this.props.pName} did you harvest?</p>
                                        </Col>
                                        <Col>
                                            <NumericInput min={0} value={this.state.quant} onChange={this.updateQ} />
                                            <p>{this.state.quant}</p>
                                        </Col>
                                    </Row>
                                    <Form>
                                        {['checkbox'].map((type) => (
                                            <div key={`default-`} className="mb-3">
                                                <Form.Check
                                                    type={type}
                                                    id={`default-`}
                                                    label={`add to your emissions total?`}
                                                />
                                            </div>
                                        ))}
                                    </Form>
                                    <Button className="green-btn" size="lg" onClick={(e) => this.updatePlantQuantity(e)}>Confirm</Button>
                                </Container>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </Col>
    )
                                        }
}
export default Plant;
