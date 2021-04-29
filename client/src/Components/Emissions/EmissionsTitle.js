import React, {Component} from 'react';
import {Row, Container} from "react-bootstrap";

export class EmissionsTitle extends React.Component {
    render() {
        return (
          <section className="green-background">
            <div className="container">
              <Row>
                <div>
                    <div className="content-header">
                      <h2>my emissions</h2>
                    </div>
                    <h1 id="emissions-num">30,750 <span className="darkgreen-text medium-text">g CO2e Saved</span></h1>
                </div>
                {/* image will go here */}
              </Row>
            </div>
          </section>
        )
    }
}
