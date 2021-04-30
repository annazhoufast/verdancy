import React, {Component} from 'react';
import {Row, Container} from "react-bootstrap";

export class Background extends React.Component {
    render() {
      return (
          <section>
            <div className="container">
              <Row>
                <div id="background-desc" className="left-stuff">
                  <h2>the background</h2>
                  <br />
                  <p>8% of personal carbon footprint comes from food. That's around 720 lbs a year!</p>
                  <br/>
                  <p>
                    At Verdancy, we believe small changes lead to big impacts. Simply growing your own vegtables with
                    home gardening will drastically reduce your carbon footprint. Let's show you how!
                  </p>
                </div>
                <img src="https://raw.githubusercontent.com/annazhoufast/plantastic/main/client/src/imgs/home/footprint.png?token=AKMRZNWA7655LQQWV53PJ6TASSLNI"
                alt="carbon footprint illustration" id="background-img"/>
              </Row>
            </div>
          </section>
      )
    }
}
