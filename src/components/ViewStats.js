import React, { Component } from 'react';
import {
  Text,
  AsyncStorage,
  View,
} from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Router from '../../navigation/Router';
import ENV from '../../app_keys';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ViewStats extends React.Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
    calories: 0,
    weight_loss_rate: 0,
  }

  componentWillMount(){
    AsyncStorage.getItem("UserApiKey").then( key => {
      fetch(ENV.BASE_URL + "/api/v1/stats", {
        headers: {
          'CLIENT_KEY': ENV.CLIENT_KEY,
          'api_key': key
        }
      })
      .then(response => response.json())
      .then(json => this.updateState(json) )
    })
  }

  updateState(data){
    this.setState({ calories: data.calories, weight_loss_rate: data.weight_loss_rate })
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
      .then(json => this.receivedResponse(json) )

  }

  receivedResponse(data) {
    if (data.user) {
      this.onLoginSuccess(data);
    } else if (data.success === false) {
      this.onLoginFail()
    }
  }

  onLoginSuccess(data) {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
      updating: false,
    });

    AsyncStorage.setItem('UserCalories', data.stats.calories.toString());
    this.props.loginUser();

  }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false,
    })
  }

  onUpdatePress(){
    this.setState({ updating: true })
  }

  renderUpdateButton() {
    if (this.state.loading) {
      return <Spinner size="small"/>;
    } else {
      return (
        <Button onPress={this.onUpdatePress.bind(this)}>
          Adjust Calorie Goal
        </Button>
      )
    }
  }

  renderForm(){
    return (
      <View>
        <CardSection style={{backgroundColor: 'transparent'}}>
          <Input
            style={styles.container}
            placeholder="Age"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            />
        </CardSection>
        <CardSection style={{backgroundColor: 'transparent'}}>
          <Input
            style={styles.container}
            placeholder="Weight"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            />
        </CardSection>
        <CardSection style={{backgroundColor: 'transparent'}}>
          <Input
            style={styles.container}
            placeholder="Height"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            />
        </CardSection>
        <CardSection>
          <Input
            placeholder='Desired Weight Loss Rate'
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          <Button>
            Save Stats
          </Button>
        </CardSection>
      </View>
    )
  }

  renderContent(){
    if (this.state.updating) {
      return this.renderForm();
    } else {
      return (
        <View>
          <CardSection>
            <Text>Daily Calorie Allowance: {this.state.calories} Calories</Text>
          </CardSection>
          <CardSection>
            <Text>Desired Weekyly Progress: {this.state.weight_loss_rate} kg/week</Text>
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>

          <CardSection>
            {this.renderUpdateButton()}
          </CardSection>
        </View>
      )
    }
  }

  render() {
    return (
      <Card style={styles.container}>
        {this.renderContent()}
      </Card>
    )
  }
}


const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  container: {
    backgroundColor: 'transparent',
  }
}

export default connect(null, actions)(ViewStats);
