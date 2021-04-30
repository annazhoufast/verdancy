import React, {Component, useState} from 'react';
import {Result} from './Result';
import {Row, CardDeck} from 'react-bootstrap';
import Form from './Form';

export class ResultGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.plants,
            plants: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        const response = fetch("https://verdancy.capstone.ischool.uw.edu/v1/plants")
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                this.setState({plants: result, isLoaded: true});
                // result.map(cur => (
                //     this.state.singlePlants.push(
                //         // <Route exact path={`/plant/${cur.PlantID}`}>
                //         //     <SinglePlant id={cur.PlantID}/>
                //         // </Route>
                //     )
                // ));
            });
    }

    render() {

        if (!this.state.isLoaded) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
            <div>
                <Row className="db-row">
                    {this.state.plants.map(item => (
                        <Result pName={item.PlantName} pSName={item.PlantScientificName}
                            difficulty={item.Difficulty} image={item.ImageLink} id={item.PlantID} />
                    ))}
                </Row>
            </div>
            )
                    }
    }
}
