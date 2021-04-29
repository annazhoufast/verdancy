import React, {Component, useState} from 'react';
import {EmissionsTitle} from './EmissionsTitle';
import {Conversions} from './Conversions';
import {Breakdown} from './Breakdown';

export class Emissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            totalEm: 0,
            auth: localStorage.getItem("Authorization")
        }
    }

    componentDidMount() {
        fetch("https://verdancy.capstone.ischool.uw.edu/v1/emissions/", {
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
                        totalEm: result.Emissions
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
        return (
            <body>

              <EmissionsTitle emissions={this.state.totalEm} />
              <Conversions emissions={this.state.totalEm} />
              <Breakdown />

            </body>
        )
    }
}
