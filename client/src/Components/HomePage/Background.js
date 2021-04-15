import React, {Component} from 'react';
import {Row, Container} from "react-bootstrap";

export class Background extends React.Component {
    render() {
      return (
          <section>
            <div className="container">
              <Row>
                <div>
                  <h2>the background</h2>
                  <br />
                  <br />
                  <p>8% of personal carbon footprint comes from food. That's around 720 lbs a year!</p>
                  <br />
                  <p>
                    At Verdancy, we believe small changes lead to big impacts. Simply growing your own vegtables with
                    home gardening will drastically reduce your carbon footprint. Let's show you how!
                  </p>
                </div>
                {/* image will go here */}
              </Row>
            </div>
          </section>
      )
    }
}
