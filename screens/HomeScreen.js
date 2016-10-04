import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
// import RecipeDetails from '../components/RecipeDetails';
import Home from '../components/Home';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }


  render() {
    return (
      <Home navigator={this.props.navigator} />
    );
  }

}

const styles = StyleSheet.create({

});
