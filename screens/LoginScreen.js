import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import LoginForm from '../components/LoginForm'

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Login ',
    },
  }
  render() {
    return <LoginForm />;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
