import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
// import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class SignupForm extends React.Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

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
      first_name: '',
      last_name: '',
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
            placeholder="John"
            label="First Name"
            value={this.state.first_name}
            onChangeText={first_name => this.setState({ first_name })}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder="Smith"
            label="last_name"
            value={this.state.last_name}
            onChangeText={last_name => this.setState({ last_name })}
          />
        </CardSection>

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
