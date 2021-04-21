import React, {Component} from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {Row, Container} from "react-bootstrap";

export class TitleCard extends React.Component {
    render() {
      return (
          <section className="green-background">
            <div className="container">
              <Row>
                <div>
                  <h1>verdancy</h1>
                  <h2>[vər-​dᵊn(t)-​sē] noun</h2>
                  <h2>1. <span className="darkgreen-text"><b>green</b></span> with vegetation</h2>
                  <br />
                  <div className="title-desc">
                    <p>Go <span className="darkgreen-text"><b>green</b></span> with us. Reduce your
                    carbon footprint with home gardening!</p>
                  </div>
                  <br />
                  <Button className="darkgreen-background">
                    <Link to="/search" className="link darkgreen-background">Search our vegetables</Link>
                  </Button>
                </div>
                {/* image will go here */}
              </Row>
            </div>
          </section>
      )
    }
}