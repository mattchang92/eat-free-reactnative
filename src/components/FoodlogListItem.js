import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import TouchableOpacity from '@exponent/react-native-touchable-native-feedback-safe';

import Layout from '../../constants/Layout';
import { RegularText, BoldText } from './StyledText';
import Router from '../../navigation/Router';


export default class FoodlogListItem extends React.Component {
  render() {
    let {
      name,
      ingredients,
      calories,
      servings,
      fats,
      carbs,
      proteins,
      tags,
      photo,
      directions,
    } = this.props.recipe;

    return (
      <TouchableOpacity onPress={() => {this._handlePressRecipe(this.props.recipe)}} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="cover"
            source={{uri: photo}}
            style={styles.photo}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text>{name}</Text>
          <Text>{calories} calories per serving</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _handlePressRecipe = (recipe) => {
    this.props.navigator.push(Router.getRoute('details', { recipe }));
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: Layout.window.width,
  },
  logoContainer: {
    padding: 15,
    flex: 2,
  },
  infoContainer: {
    flex: 3,
  },
  photo: {
    width: 135,
    height: 75,
  },
});
