import React from 'react';
import {
  Location,
  Permissions,
} from 'exponent';
import {
  ScrollView,
  StyleSheet,
  AsyncStorage,
  ListView,
  Text,
  View,
} from 'react-native';
import { Spinner, CardSection } from './common';
import { connect } from 'react-redux';
import ENV from '../../app_keys';
import * as actions from '../actions';

import FoodlogListItem from './FoodlogListItem';
import RecipeListItem from './RecipeListItem';
import Router from '../../navigation/Router';
import RootNavigation from '../../navigation/RootNavigation'

class FoodlogList extends React.Component {

  state = {
    foodlog: [],
    calories: 0,
    maxCalories: 0,
    fats: 0.0,
    proteins: 0.0,
    carbs: 0.0,
  }

  componentWillMount(){
    // DELETE AFTER
    fetch("http://localhost:3000/api/v1/foodlogs", {
      headers: {
        'CLIENT_KEY': "5a9a23fb5c1ed67501149e179c49292299467b58c8cb84bb62f26a08ddd0f7db",
        'api_key': "2757ec8696b96523b13af0f7821e7ed1e1dac05156007c3a7706ec4ae5accbe3"
      }
    })
    .then(response => response.json())
    // .then(json => {console.log(json)} )
    .then(json => this.props.updateFoodlog(json) )
  }

  componentDidMount() {
    AsyncStorage.getItem('UserCalories').then( maxCalories => { this.setState({ maxCalories }) })
  }

  calculateFats(){
    let fats = 0;
    for (var i=0; i<this.props.foodlog.length; i++) {
      fats += (this.props.foodlog[i].recipe.fats * this.props.foodlog[i].servings)
    }
    return (Math.round((fats * 9000)/this.calculateCalories())/10)
  }

  calculateCarbs(){
    let carbs = 0;
    for (var i=0; i<this.props.foodlog.length; i++) {
      carbs += (this.props.foodlog[i].recipe.carbs * this.props.foodlog[i].servings)
    }
    return (Math.round((carbs * 4000)/this.calculateCalories())/10)
  }

  calculateProteins(){
    return Math.round(10*(100 - this.calculateCarbs() - this.calculateFats() ))/10;
  }

  calculateCalories(){
    let calories = 0;
    for (var i=0; i<this.props.foodlog.length; i++) {
      calories += (this.props.foodlog[i].recipe.calories * this.props.foodlog[i].servings)
    }
    return calories;
  }

  renderRecipes(){
    if (this.props.foodlog !== "") {
      return (
        <ScrollView style={styles.scrollStyle}>
          {
            this.props.foodlog.map(foodlog => (
              <FoodlogListItem
                servings={foodlog.servings}
                foodlogId={foodlog.foodlog_id}
                recipe={foodlog.recipe}
                key={foodlog.foodlog_id}
                navigator={this.props.navigator}
              />
            ))
          }
        </ScrollView>
      )
    } else {
      return  <Text>No Recipes Added Yet Today</Text>
    }
  }

  renderStats(){
    if (this.props.foodlog === "") {
      return <Spinner size="small"/>
    } else {
      return  (
        <View style={styles.statsStyle}>
          <View style={styles.statsTitleStyle}>
            <Text>Today's Goal</Text>
            <Text>Currently at: {this.calculateCalories()}/{this.state.maxCalories} calories</Text>
          </View>
          <View style={styles.macrosTitleStyle}>
            <Text>Calorie Composition</Text>
          </View>
          <View style={styles.macrosContainerStyle}>
            <View style={styles.macrosStyle}>
              <Text>Fats: {this.calculateFats()}%</Text>
            </View>
            <View style={styles.macrosStyle}>
              <Text>Carbs: {this.calculateCarbs()}%</Text>
            </View>
            <View style={styles.macrosStyle}>
              <Text>Proteins: {this.calculateProteins()}%</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderRecipes()}
        {this.renderStats()}
      </View>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return { foodlog: state.foodlog, navigator: ownProps.navigator }
}


// export default FoodlogList
export default connect(mapStateToProps, actions)(FoodlogList)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  scrollStyle: {
    flex: 8,
  },
  statsStyle: {
    flex: 2,
  },
  statsTitleStyle: {
    alignItems: 'center',
  },
  macrosTitleStyle: {
    alignItems: 'center',
  },
  macrosContainerStyle: {
    flexDirection: 'row',
  },
  macrosStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
