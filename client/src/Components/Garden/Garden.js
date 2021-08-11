import React, {Component} from 'react';
import {PlantGroup} from './PlantGroup';
import {Button, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class Garden extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
      }
    render() {
        return (
          <section>
            <div className="container">
                <Row>
                    <Col>
                        <h2>my garden</h2>
                    </Col>
                    <Col className="add-more">
                        <Link to="/search">
                            <Button className="add-button" variant="success" size="lg">+ add more vegetables</Button>
                        </Link>
                    </Col>
                </Row>
                <span>Be sure to log your harvest activity when you're ready to eat your produce!</span>
                <PlantGroup stuff={this.props.plants} />
            </div>
          </section>
        )
    }
}
