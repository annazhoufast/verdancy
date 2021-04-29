import React, {Component} from 'react';
import {Row, Container} from "react-bootstrap";
import {IndividualConversion} from "./IndividualConversion.js";

export class Conversions extends React.Component {
    render() {
        const convRates = [0.0024813, 0.000869565217, 0.76794186];
        const emissions = this.props.emissions;
        let b = [];
        for (let i = 0; i < 3; i++) {
            // Math.round((numb + Number.EPSILON) * 100) / 100;
            let conv = Math.round(convRates[i] * emissions * 100) / 100;
            b.push(<IndividualConversion savings={conv} />);
        }

        return (
          <section>
            <div className="container">
              <Row>
                <div>
                  <h2 className="centered">Let’s break this down! {emissions} g CO2e equates to...</h2>
                  <br />
                  <Row>
                    {b}
                  </Row>
                </div>
              </Row>
            </div>
          </section>
        )
    }
}
