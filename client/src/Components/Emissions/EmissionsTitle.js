import React, {Component, useState} from 'react';
import {Row, Container} from "react-bootstrap";

export class EmissionsTitle extends React.Component {

    render() {
        console.log(this.props.totalEm);
        return (
          <section className="green-background">
            <div className="container">
              <Row>
                <div>
                    <div className="content-header">
                      <h2>my emissions</h2>
                    </div>
                    <h1 id="emissions-num">{this.props.emissions}<span className="medium-text"> g <span className="darkgreen-text">CO2e saved</span></span></h1>
                </div>
                {/* image will go here */}
              </Row>
            </div>
          </section>
        )
    }
}
