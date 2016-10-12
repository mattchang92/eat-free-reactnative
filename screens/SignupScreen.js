import React from 'react';
import {
  ExponentLinksView,
} from '@exponent/samples';
import SignupForm from '../src/components/SignupForm'

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Sign Up',
      backgroundColor: '#007aff'
    },
  }
  render() {
    return <SignupForm />;
  }

}
