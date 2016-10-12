import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { CardSection, Button } from './common';
import ENV from '../../app_keys';
import RecipeDetails from './RecipeDetails';

import Layout from '../../constants/Layout';
import { RegularText, BoldText } from './StyledText';
import Router from '../../navigation/Router';


class FoodlogListItem extends React.Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
    // LayoutAnimation.easeInEaseOut();
  }

  render() {
    let {
      name,
      ingredients,
      calories,
      fats,
      carbs,
      proteins,
      tags,
      photo,
      directions,
    } = this.props.recipe;
    let { servings } = this.props;

    return (
      <View>
        <TouchableOpacity onPress={() => {this.onRecipeClick()}} style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="cover"
              source={{uri: photo}}
              style={styles.photo}
              />
          </View>
          <View style={styles.infoContainer}>
            <Text>{name}</Text>
            <Text>{this.calculateCalories()} calories in {servings} serving</Text>
          </View>
        </TouchableOpacity>
        {this.renderDetails()}
      </View>
    );
  }

  onRecipeClick(){
    if (this.props.selectedFoodlogId === this.props.foodlogId) {
      this.props.deselectFoodlog()
    } else {
      this.props.selectFoodlog(this.props.foodlogId)
    }
  }

  removeRecipe() {
    AsyncStorage.getItem('UserApiKey').then(key => {
      fetch(ENV.BASE_URL + "/api/v1/foodlogs", {
        method: 'DELETE',
        headers: {
          'CLIENT_KEY': ENV.CLIENT_KEY,
          'API_KEY': key,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          foodlogId: this.props.foodlogId
        })
      })
      .catch(() => { console.log('failed so badly') })
      .then(response => response.json())
      .then(response => {
        this.props.updateFoodlog(response);
      })
    })
  }

  renderDetails() {
    const { expanded, recipe, selectedRecipeId } = this.props

    if (expanded) {
      return (
        <CardSection>
          <View style={styles.buttonsContainer}>
            <View style={styles.detailsButtonContainer}>
              <Button onPress={() => {this.handlePressRecipe(this.props.recipe); console.log(this)}}>View Details</Button>
            </View>
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity onPress={this.removeRecipe.bind(this)} style={styles.buttonStyle}>
                <Text style={styles.textStyle}>
                  Remove This Recipe
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardSection>
      );
    }
  }

  calculateCalories(){
    let calories = this.props.recipe.calories;
    let servings = this.props.servings;
    return calories * servings
  }

  handlePressRecipe = (recipe) => {
    this.props.navigator.push(Router.getRoute('details', { recipe }));
  }

}

const mapStateToProps = (state, ownProps) => {
  const expanded =  state.selectedFoodlogId === ownProps.foodlogId
  return {  expanded,
            recipe: ownProps.recipe,
            foodlogId: ownProps.foodlogId,
            selectedFoodlogId: state.selectedFoodlogId,
            navigator: ownProps.navigator
          }
}


export default connect(mapStateToProps, actions)(FoodlogListItem);


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
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  detailsButtonContainer: {
    flex: 1,
  },
  deleteButtonContainer: {
    flex: 1,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  textStyle: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
});
