import React, {Component} from 'react';
import {Row, Container} from "react-bootstrap";
import {IndividualConversion} from "./IndividualConversion.js";

export class Conversions extends React.Component {
    render() {


      // using IndividualConversion component
      {/*
        const convRates = [0.0024813, 0.000869565217, 0.76794186];
        const emissions = this.props.emissions;
        let b = [];
        for (let i = 0; i < 3; i++) {
            // Math.round((numb + Number.EPSILON) * 100) / 100;
            let conv = Math.round(convRates[i] * emissions * 100) / 100;
            b.push(<IndividualConversion savings={conv} />);
        }
        */}

        const emissions = this.props.emissions;
        const mileRate = 0.0024813;
        const plasticRate = 0.000869565217;
        const waterRate = .76794186;
        let miles = Math.round(mileRate * emissions * 100) / 100;
        let plastic = Math.round(plasticRate * emissions * 100) / 100;
        let water = Math.round(waterRate * emissions * 100) / 100;

        return (
          <section>
            <div className="container">
              <Row>
                <div>
                  <h2 className="centered">Let’s break this down! {emissions} g CO2e equates to...</h2>
                  <br />
                  <Row>
                      <div className="conversion centered">
                          <h2>{miles} miles</h2>
                          <p>driven by a car</p>
                      </div>
                      <div className="conversion centered">
                          <h2>{plastic} lbs</h2>
                          <p>of plastic saved</p>
                      </div>
                      <div className="conversion centered">
                          <h2>{water} gal</h2>
                          <p>of water saved</p>
                      </div>
                  </Row>
                </div>
              </Row>
            </div>
          </section>
        )
    }
}
