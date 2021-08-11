import React, {Component, useState} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import {ResultGroup} from './ResultGroup';
import {SearchBar} from './SearchBar';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: [],
            // isLoaded: false,
            message: '',
            stuff: this.props.plants
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }
    render() {
            return (
                <ResultGroup plants={this.state.plants} />
            )
    }
}
