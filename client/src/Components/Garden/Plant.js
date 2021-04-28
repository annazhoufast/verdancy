import React, {Component, useState} from 'react';
import {Card, Button, Row, Col, Modal, Form, Container} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import NumericInput from 'react-numeric-input';


// export class Plant extends React.Component {
function Plant() {
    const [lgShow, setLgShow] = useState(false);
    return (
        <Col lg={6} className="harvest-card">
            {/* <Card> */}
            <Container className="outline">
                <Row>
                    <Col lg={5}>
                        <img src="https://raw.githubusercontent.com/annazhoufast/plantastic/main/data/imgs/tomatoe.png?token=ALLXA25BKVLL7A7AEQS3W3LASHPF6" 
                            alt="drawing of plant" className="garden-img" />
                    </Col>
                    <Col lg={7} className="harvest">
                        <h4>
                            <b>Tomatoes</b>
                        </h4>
                        <p>Harvest Total</p>
                        <p>3</p>
                        <p>Carbon Emissions Saved</p>
                        <p>357 g</p>
                        <Button onClick={() => setLgShow(true)} block className="green-btn">Harvest!</Button>
                        <Modal
                            size="lg"
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <p>How many tomatoes did you harvest?</p>
                                        </Col>
                                        <Col>
                                            <NumericInput min={0} />
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
                                    <Button className="green-btn" size="lg" onClick={() => setLgShow(false)}>Confirm</Button>
                                </Container>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>
            {/* </Card> */}
        </Col>
    )
}

// render(<Plant />);
export default Plant;