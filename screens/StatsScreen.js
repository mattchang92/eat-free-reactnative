import React from 'react';
import {
  ExponentLinksView,
} from '@exponent/samples';
import ViewStats from '../src/components/ViewStats'

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'My Stats',
      backgroundColor: '#007aff'
    },
  }
  render() {
    return <ViewStats />;
  }

}
