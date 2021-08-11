import React, {Component} from 'react';
import {TitleCard} from './TitleCard';
import {Background} from './Background';
import {Steps} from './Steps';

export class Home extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
      }

    render() {
        return (
            <body id="homepage">

              <TitleCard />
              <Background />
              <Steps />

            </body>
        )
    }
}
