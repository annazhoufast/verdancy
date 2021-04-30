import React, {Component, useState} from 'react';
import {Result} from './Result';
import {Row, CardDeck} from 'react-bootstrap';

export class ResultGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://verdancy.capstone.ischool.uw.edu/v1/plants")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    console.log(result.items);
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
            )
    }
    render() {
        const {error, isLoaded, items} = this.state;
        // console.log(items);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
            <div>
                <Row className="db-row">
                    {items.map(item => (
                        <Result pName={item.PlantName} pSName={item.PlantScientificName}
                            difficulty={item.Difficulty} image={item.ImageLink} id={item.PlantID} />
                    ))}
                </Row>
            </div>
            )
        }
        // let r = [];
        // for (let i = 0; i < 6; i++) {
        //     r.push(<Result/>);
        // }
        // return (
        //     <div>
        //         {r}
        //     </div>
        // )
    }
}