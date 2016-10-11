import React from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

import {
  MaterialIcons,
} from '@exponent/vector-icons';
import Exponent from 'exponent';
import { NavigationBar } from '@exponent/ex-navigation'
import { Button, CardSection, LabelledInput } from './common'
import Router from '../../navigation/Router';
import ENV from '../../app_keys';

class RecipeDetails extends React.Component {

  state = {
    servings: "1",
    added: false,
  }

  addRecipe() {

    AsyncStorage.getItem('UserApiKey').then(key => {
      fetch(ENV.BASE_URL + "/api/v1/add_recipe", {
        method: 'POST',
        headers: {
          'CLIENT_KEY': ENV.CLIENT_KEY,
          'API_KEY': key,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe: {
            servings: this.state.servings,
            recipe_id: this.props.recipe.id,
          }
        })
      })
      .catch(() => { console.log('failed so badly') })
      .then(response => response.json())
      .then(response => {
        if (response.success === true) {
          this.setState({ added: true })
          this.props.updateFoodlog()
        }
      })
    })


  }

  render() {
    let {
      name,
      photo,
      ingredients,
      directions,
    } = this.props.recipe;

    return (
      <View style={{flex: 1}}>
        <View style={[styles.heroBackground, {backgroundColor: '#1C181B'}]} />

        <View style={styles.hero}>
          <Image
            source={{uri: photo}}
            style={{width: 250, height: 175}}
            resizeMode="center"
          />
        </View>

        <ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{marginTop: 300, backgroundColor: '#fff'}}
        >
          <Text style={styles.recipeNameStyle}>{name}</Text>
          <Text>{ingredients}</Text>
          <CardSection>
            <LabelledInput
              label="Servings"
              placeholder="1"
              value={this.state.servings}
              onChangeText={servings => this.setState({ servings })}
            />
          </CardSection>
          <Text>
            {this._renderMessage()}
          </Text>
          <CardSection>
            <Button onPress={this.addRecipe.bind(this)}>
              Add This Recipe
            </Button>
          </CardSection>
          <View style={{height: 1000, width: 320}}>
          </View>
        </ScrollView>

        {this._renderNavigationBar()}

        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  _renderMessage() {
    if (this.state.added) {
      return "Recipe successfully added!"
    }
    return null
  }

  _renderNavigationBar() {

    return (
      <Animated.View style={[styles.navigationBar, {backgroundColor: '#1C181B'}]}>
        <View style={[styles.navigationBarAction, {marginLeft: -5}]}>
          <NavigationBar.BackButton
            tintColor={'white'}
            onPress={() => this.props.navigator.pop() }
          />
        </View>
      </Animated.View>
    );
  }


}

const styles = StyleSheet.create({
  recipeNameStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'center'
  },
  heroBackground: {
    height: 500,
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBarAction: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBarTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    alignItems: 'center',
    paddingTop: Exponent.Constants.statusBarHeight,
    paddingHorizontal: 5,
  },
});


export default connect(null, actions)(RecipeDetails)
