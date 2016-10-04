import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
// import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends React.Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    fetch("http://localhost:3000/api/v1/authenticate_user?login_request=true", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).catch(() => { console.log('failed hardcore') })
      .then(response => response.json())
      .then(json => { console.log(json.api_key) })

    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(this.onLoginSuccess.bind(this))
    //   .catch(() => {
    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //       .then(this.onLoginSuccess.bind(this))
    //       .catch(this.onLoginFail.bind(this));
    //   });
  }


  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
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
        <Button onPress={this.onButtonPress.bind(this)}>
          Log in
        </Button>
      )
    }
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
          <Button>
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
