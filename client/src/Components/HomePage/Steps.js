import React, {Component} from 'react';
import {Row, Container} from 'react-bootstrap';
import {IndividualSteps} from "./IndividualSteps";
import search from '../../imgs/home/search.png';
import add from '../../imgs/home/add.png';
import harvest from '../../imgs/home/harvest.png';


export class Steps extends React.Component {
    render() {
        var steps = require("../../data/homeSteps.json");
        let s = [];
        let igs = [];
        igs.push(search);
        igs.push(add);
        igs.push(harvest);
        for (let i = 0; i < steps.length; i++) {
            s.push(
                <IndividualSteps img={igs[i]}
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
                    <br />
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
