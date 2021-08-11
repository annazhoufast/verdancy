import React, {Component} from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {Row, Container} from "react-bootstrap";
import {IndividualConversion} from "./IndividualConversion.js";
import carig from '../../imgs/emissions/carig.png';
import plasticig from '../../imgs/emissions/plasticig.png';
import waterig from '../../imgs/emissions/waterig.png';

// j
export class Conversions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toggleDisplay: "hidden",
            toggleButton: "display-on"
        };
    }

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
                  <h3 id="conversion-top-h3">Let’s break this down!</h3>
                  <h3 id="conversion-bottom-h3">Saving <span className="green-text">{emissions} gCO2e</span> is the same as saving...</h3>
                  <Row>
                      <div className="conversion centered">
                          <img src={carig}
                          alt="car icon" className="individ-step"/>
                          <p className="conversion-num">{miles} miles</p>
                          <p>driven by a car</p>
                      </div>
                      <div className="conversion centered">
                          <img src={plasticig}
                          alt="plastic icon" className="individ-step"/>
                          <p className="conversion-num">{plastic} lbs</p>
                          <p>of plastic</p>
                      </div>
                      <div className="conversion centered">
                          <img src={waterig}
                          alt="water icon" className="individ-step"/>
                          <p className="conversion-num">{water} gal</p>
                          <p>of water</p>
                      </div>
                  </Row>
                </div>
              </Row>
              <Button className={`green-button calculated-info ${ this.state.toggleButton}`} size="lg" onClick={this.showDisplay.bind(this)}>
                  <span>How are all these numbers calculated?</span>
              </Button>
              <div className={`centered ${ this.state.toggleDisplay}`}>
                  <h3 className="calculated-info">How are all these numbers calculated?</h3>
                  <br />
                  <div id="calculated-desc">
                      <p>
                        To bridge the gap between home-gardened vegetables and carbon emissions, we compiled a collection of resources together for our database.
                        First, we collected vegetable data from <a href="https://sympathink.com/vegetables/" className="link" target="_blank"><b>Sympathink’s Garden Calendar </b></a>
                        and <a href="https://github.com/damwhit/harvest_helper" className="link" target="_blank"><b>Dave’s Harvest Helper database</b></a> to provide the vegetables for our platform.
                      </p>
                      <p>
                        We then collected the average weight for the individual unit (one tomato, one sprig of basil, etc.) of each vegetable from the U.S.
                        Department of Agriculture's <a href="https://fdc.nal.usda.gov/" className="link" target="_blank"><b>FoodData Central API</b></a>.
                      </p>
                      <p>
                        With this average weight for each vegetable, we then used the <a href="https://myemissions.green/food-carbon-footprint-calculator/" className="link" target="_blank">
                        <b>Food Carbon Footprint Calculator</b></a> from My Emissions, a company that advocates for the environmental impact of food sourcing. Using this calculator,
                        we determined the average amount of carbon emissions saved per vegetable. When vegetables are harvested in the My Garden feature, we use these
                        numbers to calculate your overall total for carbon emissions saved.
                      </p>
                      <p>
                        For converting gCO2e to other metrics such as water and plastic saved, we researched resources from the U.S. Environmental Protection Agency to find <a href="https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references"
                        className="link" target="_blank"><b>greenhosue gas equivalencies, rates, and references</b></a>. This data is used to convert your overall total of carbon emissions into more familiar terms!
                      </p>
                      <p>
                        Of course, since all of these calculations are based off of averages, your emissions data is meant to be an estimate. However, we hope that this data still illustrates the great potential that
                        home gardening can have on the environment, and encourages you to grow your own vegetables more often!
                      </p>
                  </div>
                  <Button className="green-button co2e-info" size="lg" onClick={this.hideDisplay.bind(this)}>
                      <span>OK, got it!</span>
                  </Button>
              </div>
            </div>
          </section>
        )
    }

    showDisplay= () => {
        this.setState({
          toggleDisplay: "display-on",
          toggleButton: "hidden"
        })
    }

    hideDisplay= () => {
        this.setState({
          toggleDisplay: "hidden",
          toggleButton: "display-on"
        })
    }

}
