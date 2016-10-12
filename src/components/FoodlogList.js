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
import { connect } from 'react-redux';
import ENV from '../../app_keys'

import FoodlogListItem from './FoodlogListItem';
import RecipeListItem from './RecipeListItem';
import Router from '../../navigation/Router';
import RootNavigation from '../../navigation/RootNavigation'

class FoodlogList extends React.Component {

  state = {
    foodlogs: [],
    calories: 0,
    maxCalories: 0,
    fats: 0.0,
    proteins: 0.0,
    carbs: 0.0,
  }

  componentDidMount() {
    AsyncStorage.getItem('UserCalories').then( maxCalories => { this.setState({ maxCalories }) })
  }

  // calculateFats(){
  //   let fats = 0;
  //   for (var i=0; i<this.state.foodlogs.length; i++) {
  //     fats += (this.state.foodlogs[i].recipe.fats * this.state.foodlogs[i].servings)
  //   }
  //   this.setState({ fats: Math.round((fats * 9000)/this.state.calories)/10 })
  // }
  //
  // calculateCarbs(){
  //   let carbs = 0;
  //   for (var i=0; i<this.state.foodlogs.length; i++) {
  //     carbs += (this.state.foodlogs[i].recipe.carbs * this.state.foodlogs[i].servings)
  //   }
  //   this.setState({ carbs: Math.round((carbs * 4000)/this.state.calories)/10 })
  // }
  //
  // calculateProteins(){
  //   this.setState({ proteins: 100 - (this.state.fats + this.state.carbs) })
  // }
  //
  // calculateCalories(){
  //   let calories = 0;
  //   for (var i=0; i<this.state.foodlogs.length; i++) {
  //     calories += (this.state.foodlogs[i].recipe.calories * this.state.foodlogs[i].servings)
  //   }
  //   this.setState({ calories })
  // }
  //
  // receivedRecipes(data){
  //   this.setState({
  //     foodlogs: data,
  //   })
  //   this.calculateCalories();
  //   if (this.state.calories > 0) {
  //     this.calculateFats();
  //     this.calculateCarbs();
  //     this.calculateProteins();
  //   }
  // }



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



  render() {
    return (
      <View style={styles.container}>
        {this.renderRecipes()}
        <View style={styles.statsStyle}>
          <View style={styles.statsTitleStyle}>
            <Text>Today's Goal</Text>
            <Text>Currently at: {this.state.calories}/{this.state.maxCalories} calories</Text>
          </View>
          <View style={styles.macrosTitleStyle}>
            <Text>Calorie Composition</Text>
          </View>
          <View style={styles.macrosContainerStyle}>
            <View style={styles.macrosStyle}>
              <Text>Fats: {this.state.fats}%</Text>
            </View>
            <View style={styles.macrosStyle}>
              <Text>Carbs: {this.state.carbs}%</Text>
            </View>
            <View style={styles.macrosStyle}>
              <Text>Proteins: {this.state.proteins}%</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return { foodlog: state.foodlog, navigator: ownProps.navigator }
}


// export default FoodlogList
export default connect(mapStateToProps)(FoodlogList)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  scrollStyle: {
    flex: 8,
  },
  statsStyle: {
    flex: 3,
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
