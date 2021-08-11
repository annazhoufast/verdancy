import React, {Component, useState} from 'react';
import {Result} from './Result';
import {Row, CardDeck, InputGroup, FormControl, Button} from 'react-bootstrap';
import Form from './Form';

export class ResultGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.plants,
            plants: [],
            isLoaded: false,
            searchTerm: '',
            stuff2: []
        };
    }

    editSearchTerm = (e) => {
        this.setState({searchTerm: e.target.value});
        // return this.state.stuff2.filter(cur => cu r.PlantName.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    dynamicSearch = () => {
        return this.state.plants.filter(cur => cur.PlantName.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    componentDidMount() {
        const response = fetch("https://verdancy.capstone.ischool.uw.edu/v1/plants")
            .then(res => res.json())
            .then((result) => {
                // console.log(result);
                let s = result.map(item => (
                    <Result pName={item.PlantName} pSName={item.PlantScientificName}
                        difficulty={item.Difficulty} image={item.ImageLink} id={item.PlantID} />

                ))
                this.setState({plants: s, isLoaded: true});
            })
    }

    render() {
        // console.log(localStorage.getItem("ups"))
        if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <section id="search-bar">
                        <div className="container">
                            <h2>search our vegetable database</h2>
                            <div>
                                <InputGroup className="mb-3" onChange={this.editSearchTerm}>
                                    <FormControl
                                        placeholder="Enter vegetable name here"
                                        aria-label="plantName"
                                        aria-describedby="basic-addon2"
                                        />
                                    {/*<InputGroup.Append>
                                        <Button variant="outline-success">search</Button>
                                    </InputGroup.Append>*/}
                                </InputGroup>
                            </div>
                        </div>
                    </section>
                    <div className="container">
                      <div id="results">
                          <Row className="db-row">
                              {
                                this.state.plants.filter(d => d.props.pName.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                              }
                          </Row>
                      </div>
                    </div>
                </div>
            )
                    }
    }
}
