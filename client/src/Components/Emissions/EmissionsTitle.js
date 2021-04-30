import React, {Component, useState} from 'react';
import {Row, Container} from "react-bootstrap";

export class EmissionsTitle extends React.Component {

    render() {
        console.log(this.props.totalEm);
        return (
          <section className="green-background">
            <div className="container">
              <Row>
                <div className="left-stuff">
                    <div className="content-header">
                      <h2>my emissions</h2>
                    </div>
                    <h1 id="emissions-num">{this.props.emissions}<span className="medium-text"> g <span className="darkgreen-text">CO2e saved</span></span></h1>
                </div>
                <img src="https://raw.githubusercontent.com/annazhoufast/plantastic/main/client/src/imgs/emissions/emissions.png?token=AKMRZNVM4NTROVTZO5U7IMTASSJGC"
                alt="woman holding up a globe" id="emissions-img"/>
              </Row>
            </div>
          </section>
        )
    }
}
