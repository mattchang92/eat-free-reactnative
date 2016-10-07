import React from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Card, CardSection, Button } from './common'
import LoginForm from './LoginForm'

// import RecipeDetails from '../components/RecipeDetails';
import Router from '../../navigation/Router';

export default class Home extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }


  render() {
    return (
      <Image source={require('../../assets/images/Optimized-background-bottom.jpg')} style={styles.backgroundImage}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Eat Free</Text>
        </View>

        <LoginForm />

      </Image>
    );
  }

  _handleLearnMorePress = () => {
    Linking.openURL('https://docs.getexponent.com/versions/latest/guides/development-mode');
  }

  _handleLoginPress = () => {
    this.props.navigator.push(Router.getRoute('login'));
  }

  _handleSignupPress = () => {
    this.props.navigator.push(Router.getRoute('signup'));
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    opacity: 1,
    flex: 1,
    resizeMode: 'stretch',
    width: null,
    height: null,
  },
  title: {
    fontSize: 60,
    fontFamily: "Avenir",
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

});
