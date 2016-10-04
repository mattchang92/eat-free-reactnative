import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import SignupForm from '../components/SignupForm'

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Sign Up',
    },
  }
  render() {
    return <SignupForm />;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
