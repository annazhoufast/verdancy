import React, {Component} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import {ResultGroup} from './ResultGroup';

export class Search extends React.Component {
    render() {
        return (
            <div>
                <h1>search our plant database</h1>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        />
                </InputGroup>
                <ResultGroup/>
            </div>
        )
    }
}