import React, {Component} from 'react';
import {Plant} from "./Plant";

export class PlantGroup extends React.Component {
    render() {
        let plants = [];
        for (let i = 0; i < 4; i++) {
            plants.push(<Plant/>);
        }
        return (
            <div>
                {plants}
            </div>
        )
    }
}