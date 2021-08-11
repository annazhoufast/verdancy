import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';


export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: false,
            loading: false,
            message: ''
        }
    }

    render() {
        const handleOnInputChange = (event) => {
            const query = event.target.value;
                    this.setState({ query, loading: true, message: ''  } );
        };
        return(
            <section id="search-bar">
                <div className="container">
                    <div>
                        <h2>search our plant database</h2>
                        <InputGroup className="mb-3" onChange={this.handleOnInputChange}>
                            <FormControl
                                placeholder="Enter vegetable name here"
                                aria-label="plantName"
                                aria-describedby="basic-addon2"
                                />
                            <InputGroup.Append>
                                <Button variant="outline-success">search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Container>
                            <Row>
                                {/* <Col>
                                    <p className="font-size-14">All</p>
                                </Col> */}
                                <Col>
                                    <p className="font-size-14">Vegetables</p>
                                </Col>
                                <Col>
                                    <p className="font-size-14">Easiest Plants</p>
                                </Col>
                                <Col>
                                    <p className="font-size-14">Root Vegetables</p>
                                </Col>
                                <Col>
                                    <p className="font-size-14">Low Maintenance</p>
                                </Col>
                                <Col>
                                    <p className="font-size-14">Low Sunlight</p>
                                </Col>
                                <Col>
                                    <p className="font-size-14">Low Maintainence</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </section>
        )
    }
}
