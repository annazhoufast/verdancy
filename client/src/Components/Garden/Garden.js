import React, {Component} from 'react';
import {PlantGroup} from './PlantGroup';

export class Garden extends React.Component {
    render() {
        return (
            <div>
                <h1>my garden</h1>
                <p>Be sure to log your harvest activity when you're ready to eat your produce!</p>
                <PlantGroup/>
            </div>
        )
    }
}