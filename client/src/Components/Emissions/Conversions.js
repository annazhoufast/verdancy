import React, {Component} from 'react';
import {Row, Container} from "react-bootstrap";
import {IndividualConversion} from "./IndividualConversion.js";

export class Conversions extends React.Component {
    render() {

        let b = [];
        for (let i = 0; i < 3; i++) {
            b.push(<IndividualConversion/>);
        }

        return (
          <section>
            <div className="container">
              <Row>
                <div>
                  <h2 className="centered">Let’s break this down! {this.props.emissions} g CO2e equates to...</h2>
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
