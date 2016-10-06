import React, { Component } from 'react';
import {
  Text,
  AsyncStorage,
} from 'react-native';
// import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Router from '../navigation/Router';
import ENV from '../app_keys';

export default class LoginForm extends React.Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onLoginPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    fetch(ENV.BASE_URL + "/api/v1/authenticate_user", {
      method: 'POST',
      headers: {
        'CLIENT_KEY': ENV.CLIENT_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).catch(() => { console.log('failed so badly') })
      .then(response => response.json())
      // .then(json => { console.log(json) } )
      .then(json => this.receivedResponse(json) )

  }

  receivedResponse(data) {

    if (data.api_key) {
      this.onLoginSuccess(data);
    } else {
      this.onLoginFail()
    }
  }

  onLoginSuccess(data) {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
    AsyncStorage.setItem('UserApiKey', data.api_key);
    this.props.navigator.push(Router.getRoute('rootNavigation'));

  }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false,
    })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small"/>;
    } else {
      return (
        <Button onPress={this.onLoginPress.bind(this)}>
          Log in
        </Button>
      )
    }
  }

  onFitbitPress() {
    AsyncStorage.getItem('UserApiKey').then(key => { console.log(key) })
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder='password'
            label="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          <Button onPress={this.onFitbitPress.bind(this)}>
            Sign in with Fitbit
          </Button>
        </CardSection>
      </Card>
    )
  }
}


const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}
