import React, {Component} from 'react';
import {Row, Container, Col} from "react-bootstrap";
import {Team} from './Team';
import firstscreen from '../../imgs/landing/firstscreen.png';
import secondscreen from '../../imgs/landing/secondscreen.png';
import thirdscreen from '../../imgs/landing/thirdscreen.png';
import collage from '../../imgs/landing/collage.png';

export class LandingPage extends React.Component {

    componentDidMount() {
      window.scrollTo(0, 0)
    }

    render() {
      return (
          <body id="landing-page">
                <section>
                  <div className="container">
                      <div className="centered landing-center">
                        <h2><span className="green-text">verdancy</span> helps you become more aware of your <span className="green-text">carbon footprint</span></h2>
                        <img className="landing-img" src={collage} />
                        <p id="landing-intro" className="paragraph-width centered">
                            Gardening at home can offer huge benefits and make a positive impact on your carbon footprint. Verdancy is a place
                            where gardeners and growers alike can keep track of their carbon emissions with the vegetables they grow.
                        </p>
                      </div>
                  </div>
                </section>

                <section id="landing-steps" className="shortened-section">
                  <div className="container">
                        <Row className="landing-row">
                            <Col lg={8}>
                                <h3 className="green-text">choose what you grow</h3>
                                <p className="paragraph-width">search through our database to learn more about the vegetables you can plant and harvest</p>
                            </Col>
                            <Col lg={4}>
                                <img className="landing-row-img" src={firstscreen} />
                            </Col>
                        </Row>
                        <Row className="landing-row">
                            <Col lg={4}>
                                <img className="landing-row-img" src={secondscreen} />
                            </Col>
                            <Col lg={8} className="right-align">
                                <h3 className="green-text">maintain your vegetables online</h3>
                                <span>manage all your vegetables in one place</span>
                                <br />
                                <span>and log the vegetables you harvest</span>
                            </Col>
                        </Row>
                        <Row className="landing-row">
                            <Col lg={8}>
                                <h3 className="green-text">learn how you make an impact at home</h3>
                                <p className="paragraph-width">view the carbon emissions you saved and see how easy it is to reduce your carbon footprint</p>
                            </Col>
                            <Col lg={4}>
                                <img className="landing-row-img" src={thirdscreen} />
                            </Col>
                        </Row>
                  </div>
                </section>

                <section id="problem">
                  <div className="container">
                      <div className="centered landing-center">
                        <h3>We sought to answer...</h3>
                        <div id="problem-statement">
                            <h2>
                                How might <span className="green-text">beginner gardeners</span> become motivated to <span className="green-text">
                                grow their own vegetables at home</span> so that they can <span className="green-text">reduce their carbon footprint</span>?
                            </h2>
                        </div>
                      </div>
                  </div>
                </section>

                <section id="landing-research" className="green-background">
                  <div className="container">
                      <div className="centered landing-center">
                        <h3>From our research, we discovered that...</h3>
                        <Row className="left-align">
                            <Col lg={4} >
                                <h2>1.</h2>
                                <p>
                                    About <b>8%</b> of your personal carbon footprint comes from
                                    <b> food</b>. Emissions come from transport, storage, and packaging.
                                </p>
                            </Col>
                            <Col lg={4} >
                                <h2>2.</h2>
                                <p>
                                    In a survey of 485 reponses, the biggest motivator to grow your own vegetables was the opportunity to be
                                    <b> sustainable</b>.
                                </p>
                            </Col>
                            <Col lg={4} >
                                <h2>3.</h2>
                                <p>
                                    There is a gap in the market for a resource that ties <b>gardening </b>
                                    together with <b>personal environmental impact</b>.
                                </p>
                            </Col>
                        </Row>
                      </div>
                  </div>
                </section>

                <section>
                  <div className="container">
                      <div className="centered landing-center">
                          <h2 className="paragraph-width centered"><span className="green-text">verdancy</span> is a place for gardeners to <span className="green-text">flourish</span></h2>
                          <img className="landing-med-img" src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" alt="aerial image of a grid of plants in pots" />
                          <p className="paragraph-width centered">
                              Noticing the gap between environmental impact and home gardening, we sought out to create a space for those to take
                              home gardening to the next level. Our goal is to help you get a personalized understanding of what you grow and how
                              it can leave a positive impact on the world.
                          </p>
                          <br />
                          <br />
                          <p className="paragraph-width centered">
                              We also wanted to build a platform for beginner gardeners in particular, giving them the resources and information they
                              need to be a more successful, more environmentally conscious gardener.
                          </p>
                      </div>
                  </div>
                </section>

              <section id="meet-the-team" className="shortened-section">
                <div className="container">
                    <div className="centered">
                      <h2>who we are</h2>
                      <Team />
                      <div id="who-we-are">
                          <p className="paragraph-width centered">
                              We are students from the University of Washington Information School.
                              Verdancy is our cumulative Capstone project in our final undergraduate year.
                          </p>
                          <br />
                          <br />
                          <p className="paragraph-width centered">
                              We conducted the entire iterative design process to build Verdancy: starting with research
                              of our problem space and stakeholders, conducting user interviews, concept validation, and further
                              user testing. To develop our website, we used React.js, Golang, MySQL, and Docker.
                          </p>
                      </div>
                    </div>
                </div>
              </section>

          </body>
      )
    }
}
