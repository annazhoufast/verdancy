import React, {Component} from 'react';
import {AdviceCardGroup} from './AdviceCardGroup';

export class Advice extends React.Component {
    render() {
        return (
          <section>
            <div className="container">
              <div>
                  <div className="content-header">
                    <h2>new to gardening?</h2>
                    <p>we've got you covered with some beginner's gardening tips. hover over a card to learn more!</p>
                  </div>
                  <AdviceCardGroup/>
              </div>
            </div>
          </section>
        )
    }
}
