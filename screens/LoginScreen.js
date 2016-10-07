import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import LoginForm from '../src/components/LoginForm'
import Router from '../navigation/Router';

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Login ',
    },
  }
  render() {
    return <LoginForm navigator={this.props.navigator}/>;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
