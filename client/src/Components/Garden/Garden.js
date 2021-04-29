import React, {Component} from 'react';
import {PlantGroup} from './PlantGroup';
import {Button, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class Garden extends React.Component {
    render() {
        return (
            <div className="search">
                <Row>
                    <Col>
                        <h1>my garden</h1>
                    </Col>
                    <Col className="add-more">
                        <Link to="/search">
                            <Button className="green-btn add-button" size="lg">+ add more plants</Button>
                        </Link>
                    </Col>
                </Row>
                <p>Be sure to log your harvest activity when you're ready to eat your produce!</p>
                <PlantGroup plants={this.props.plants} />
            </div>
        )
    }
}