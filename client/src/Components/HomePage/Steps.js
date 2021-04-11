import React, {Component} from 'react';
import {Row, Container} from 'react-bootstrap';
import {IndividualSteps} from "./IndividualSteps";


export class Steps extends React.Component {
    render() {
        var steps = require("../../data/homeSteps.json");
        let s = [];
        for (let i = 0; i < steps.length; i++) {
            s.push(
                <IndividualSteps img={steps[i].Img}
                                alt={steps[i].Alt}
                                title={steps[i].Title}
                                description={steps[i].Descr} />
            );
        }

        return (
            <section className="green-background">
              <div className="container">
                <Row>
                  <div>
                    <h2>three easy steps</h2>
                    <br/>
                    <br/>
                    <Row>
                        {s}
                    </Row>
                  </div>
                </Row>
              </div>
            </section>
        )
    }
}
