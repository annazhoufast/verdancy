import React, {Component} from 'react';
import {AdviceCardGroup} from './AdviceCardGroup';

export class Advice extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
      }
    render() {
        return (
          <section>
            <div className="container">
                <h2>new to gardening?</h2>
                <p>We've got you covered with some beginner's gardening tips.</p>
                <span>Hover over an advice card to learn more!</span>
                <AdviceCardGroup/>
            </div>
          </section>
        )
    }
}
