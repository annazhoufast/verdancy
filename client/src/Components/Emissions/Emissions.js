import React, {Component} from 'react';
import {EmissionsTitle} from './EmissionsTitle';
import {Conversions} from './Conversions';
import {Breakdown} from './Breakdown';

export class Emissions extends React.Component {
    render() {
        return (
            <body>

              <EmissionsTitle />
              <Conversions />
              <Breakdown />

            </body>
        )
    }
}
