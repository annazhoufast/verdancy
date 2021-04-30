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
                <div className="centered">
                  <h3 className="centered emissions-header">Let’s break this down! Saving {emissions} g CO2e is the same as saving...</h3>
                  <Row>
                      <div className="conversion centered">
                          <img src="https://raw.githubusercontent.com/annazhoufast/plantastic/main/client/src/imgs/emissions/car.png?token=AKMRZNWKOADR3IREWMNCC6TASTFLK"
                          alt="car icon" className="individ-step"/>
                          <p className="conversion-num">{miles} miles</p>
                          <p>driven by a car</p>
                      </div>
                      <div className="conversion centered">
                          <img src="https://raw.githubusercontent.com/annazhoufast/plantastic/main/client/src/imgs/emissions/plastic.png?token=AKMRZNSZ4NFFMHK3VTYPO6LASTFRQ"
                          alt="plastic icon" className="individ-step"/>
                          <p className="conversion-num">{plastic} lbs</p>
                          <p>of plastic saved</p>
                      </div>
                      <div className="conversion centered">
                          <img src="https://raw.githubusercontent.com/annazhoufast/plantastic/main/client/src/imgs/emissions/water.png?token=AKMRZNRF54GF2ALQRH735I3ASTFSI"
                          alt="water icon" className="individ-step"/>
                          <p className="conversion-num">{water} gal</p>
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
