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
} from 'react-native';
import {
  MaterialIcons,
} from '@exponent/vector-icons';
import Exponent, {
  Components,
} from 'exponent';
import { NavigationBar } from '@exponent/ex-navigation'


import {
  BoldText,
} from './StyledText';
// import formatTime from '../util/formatTime';

const { MapView } = Components;
import recipes from '../data';
const testrecipe = recipes[1];

export default class RecipeDetails extends React.Component {

  static defaultProps = {
    recipe: testrecipe,
  }

  state = {
    scrollY: new Animated.Value(0),
  }

  render() {
    let {
      name,
      photo,
      ingredients,
      directions,
    } = this.props.recipe;

    let {
      scrollY,
    } = this.state;

    let logoScale = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [1.5, 1, 1],
    });

    let logoTranslateY = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [30, 0, -30],
    });

    let logoOpacity = scrollY.interpolate({
      inputRange: [-150, 0, 200, 400],
      outputRange: [1, 1, 0.2, 0.2],
    });

    // <Animated.ScrollView
    //   scrollEventThrottle={16}
    //   style={StyleSheet.absoluteFill}
    //   contentContainerStyle={{marginTop: 300, backgroundColor: '#fff'}}
    //   onScroll={Animated.event(
    //     [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
    //     { useNativeDriver: true }
    //   )}>
    //   <Text>{name}</Text>
    //   <Text>{ingredients}</Text>
    //   <View style={{height: 1000, width: 320}}>
    //
    //   </View>
    // </Animated.ScrollView>
    //
    // <Animated.View style={[styles.navigationBar, {backgroundColor: '#1C181B'}]}>
    //   <View style={[styles.navigationBarAction, {marginLeft: -5}]}>
    //   </View>
    // </Animated.View>

    return (
      <View style={{flex: 1}}>
        <View style={[styles.heroBackground, {backgroundColor: '#1C181B'}]} />

        <View style={styles.hero}>
          <Animated.Image
            source={{uri: photo}}
            style={{width: 250, height: 175, opacity: logoOpacity, transform: [{scale: logoScale}, {translateY: logoTranslateY}]}}
            resizeMode="center"
          />
        </View>

        <Animated.ScrollView
          scrollEventThrottle={16}
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{marginTop: 300, backgroundColor: '#fff'}}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}>
          <Text>{name}</Text>
          <Text>{ingredients}</Text>
          <View style={{height: 1000, width: 320}}>

          </View>
        </Animated.ScrollView>

        <Animated.View style={[styles.navigationBar, {backgroundColor: '#1C181B'}]}>
          <View style={[styles.navigationBarAction, {marginLeft: -5}]}>
          </View>
        </Animated.View>

        {this._renderNavigationBar()}

        <StatusBar barStyle="light-content" />
      </View>
    );
  }


    _renderNavigationBar() {

      // <View style={styles.navigationBarTitle}>
      //   {this._renderNavigationBarTitle()}
      // </View>

      return (
        <Animated.View style={[styles.navigationBar, {backgroundColor: '#1C181B'}]}>
          <View style={[styles.navigationBarAction, {marginLeft: -5}]}>
            <NavigationBar.BackButton
              tintColor={'white'}
              onPress={() => this.props.navigator.pop() }
            />
          </View>


          <View style={styles.navigationBarAction}>
            <TouchableOpacity>
              <MaterialIcons
                name="directions"
                size={25}
                color={'white'}
              />
          </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }


}

const styles = StyleSheet.create({
  container: {

  },
  barIsOpenContainer: {
    backgroundColor: 'rgba(4,128,15,0.66)',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  barIsOpeningLaterContainer: {
    backgroundColor: 'rgba(241,146,36,0.66)',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,

  },
  barIsClosedContainer: {
    backgroundColor: 'rgba(128,23,4,0.66)',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  barIsOpenText: {
    color: '#fff',
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
