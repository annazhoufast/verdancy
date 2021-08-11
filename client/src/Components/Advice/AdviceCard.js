import React, {Component} from 'react';
import {Card} from 'react-bootstrap';

export class AdviceCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cardImg: props.front,
    };
}


  render() {

      const frontURL = this.props.front
      const backURL = this.props.back

      return (
          <Card className="cream-background centered" id="advice-card"
          onMouseEnter={() => {this.MouseEnter(backURL);}}
          onMouseOut={() => {this.MouseOut(frontURL);}}>
              <img src={this.state.cardImg}/>
          </Card>
      )
  }

  MouseEnter = (backURL) => {
    this.setState({
      cardImg: backURL
    })
  }

  MouseOut = (frontURL) => {
    this.setState({
      cardImg: frontURL
    })
  }

}
