import React, {Component} from 'react';
import {IndividualTeam} from './IndividualTeam.js';
import {Row, Container} from "react-bootstrap";
import ana from '../../imgs/landing/ana.png';
import anna from '../../imgs/landing/anna.png';
import jared from '../../imgs/landing/jared.png';
import jess from '../../imgs/landing/jess.png';

export class Team extends React.Component {
    render() {
        var teamData = require("../../data/team.json");
        let ppl = [];
        let igs = [];
        igs.push(jared);
        igs.push(ana);
        igs.push(jess);
        igs.push(anna)
        for (let i = 0; i < teamData.length; i++) {
            ppl.push(<IndividualTeam pfp={igs[i]}
                                        alt={teamData[i].Alt}
                                        name={teamData[i].Name}
                                        role={teamData[i].Role} />
                    );
        }

        return (
              <div className="container">
                <Row>
                  <div>
                    <br />
                    <Row>
                        {ppl}
                    </Row>
                  </div>
                </Row>
              </div>
        )
    }
}
