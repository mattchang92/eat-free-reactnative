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


export default class RecipeListItem extends React.Component {
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
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  }

  _handlePressRecipe = (recipe) => {
    console.log(this.props.navigator)

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
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 16,
  },
  hours: {
    fontSize: 12,
  },
  address: {
    fontSize: 12,
  },
  logoContainer: {
    padding: 15,
  },
  photo: {
    width: 135,
    height: 75,
  },
  buttonContainer: {
    paddingRight: 5,
  },
});
