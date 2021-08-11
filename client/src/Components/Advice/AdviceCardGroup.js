import React, {Component} from 'react';
import {AdviceCard} from './AdviceCard.js';
import {Row, Container} from 'react-bootstrap';
import startedfront from '../../imgs/advice/startedfront.png';
import startedback from '../../imgs/advice/startedback.png';

import waterfront from '../../imgs/advice/waterfront.png';
import waterback from '../../imgs/advice/waterback.png';

import sunfront from '../../imgs/advice/sunfront.png';
import sunback from '../../imgs/advice/sunback.png';

import mulchfront from '../../imgs/advice/mulchfront.png';
import mulchback from '../../imgs/advice/mulchback.png';

import soilfront from '../../imgs/advice/soilfront.png';
import soilback from '../../imgs/advice/soilback.png';

import potsfront from '../../imgs/advice/potsfront.png';
import potsback from '../../imgs/advice/potsback.png';

export class AdviceCardGroup extends React.Component {
    render() {

        var advice = require("../../data/advice.json");
        let cards = [];
        let front = [startedfront, waterfront, sunfront, mulchfront, soilfront, potsfront];
        let back = [startedback, waterback, sunback, mulchback, soilback, potsback];

        for (let i = 0; i < advice.length; i++) {
            cards.push(
                <AdviceCard front={front[i]}
                                back={back[i]}
                                frontAlt={advice[i].FrontAlt}
                                backAlt={advice[i].BackAlt} />
            );
        }

        return(
          <section className="centered" id="advice">
            <div className="container centered">
              <div className="centered">
                <Row id="advice-row" className="centered">
                  {cards}
                </Row>
              </div>
            </div>
          </section>
        )
    }
}
