import React, {Component} from 'react';
import {IndividualTeam} from './IndividualTeam.js';
import {Row, Container} from "react-bootstrap";

export class Team extends React.Component {
    render() {
        var teamData = require("../../data/team.json");
        let ppl = [];
        for (let i = 0; i < teamData.length; i++) {
            ppl.push(<IndividualTeam pfp={teamData[i].Img}
                                        alt={teamData[i].Alt}
                                        name={teamData[i].Name}
                                        role={teamData[i].Role} />
                    );
        }

        return (
            <section>
              <div className="container">
                <Row>
                  <div>
                    <h2>meet the team</h2>
                    <br />
                    <Row>
                        {ppl}
                    </Row>
                  </div>
                </Row>
              </div>
            </section>
        )
    }
}
