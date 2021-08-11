import React, {Component, useState} from 'react';
import Plant from "./Plant";
import {Row} from 'react-bootstrap';

export class PlantGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            // items: this.props.plants,
            stuff: this.props.stuff,
            auth: localStorage.getItem("Authorization")
        }
    }

    componentDidMount() {
        fetch("https://verdancy.capstone.ischool.uw.edu/v1/UserPlants/", {
            method: 'GET',
            headers: new Headers({
                'Authorization': this.state.auth
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                    // localStorage.setItem("ups", this.state.items);
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
        // console.log(this.props.plants);
        console.log(this.state.stuff)
        // console.log(this.state.auth)
        let plants = [];

        for (let i = 0; i < this.state.items.length; i++) {
            // plants.push(<Plant img={this.state.stuff[i].ImageLink}
            //                     pName={this.state.stuff[i].PlantName}
            //                     quantity={this.state.stuff[i].Total}
            //                     totCarbon={this.state.stuff[i].TotalCO2}
            //                     pID={this.state.stuff[i].PlantID} />);
            plants.push(<Plant id={this.state.items[i].PlantID}
                            img={this.state.items[i].ImageLink}
                            pName={this.state.items[i].PlantName}
                            quantity={this.state.items[i].Total}
                            totCarbon={this.state.items[i].TotalCO2}
                            pID={this.state.items[i].PlantID}
                            co2={this.state.items[i].CO2PerUnit} />);
        }
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div id="garden">
                    <Row>
                        {plants}
                    </Row>
                </div>
            )
        }
        // return (
        //     <div>
        //         <Row>
        //             {plants}
        //         </Row>
        //     </div>
        // )
    }
}
