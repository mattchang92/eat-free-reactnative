import Exponent from 'exponent';
import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import { connect } from 'react-redux';
import RecipeListItem from './RecipeListItem';
import HomeScreen from '../../screens/HomeScreen';

import Router from '../../navigation/Router';

class App extends React.Component {
  state = {
    appIsReady: false,
    userPresent: this.props.userPresent || false
  }

  renderLink() {
    console.log('renderlink', this.props.currentUser)
    if (this.props.currentUser) {
      return <StackNavigation initialRoute={Router.getRoute('rootNavigation')}
                              logOut={this.logOut}/>
    } else {
      return <StackNavigation initialRoute={Router.getRoute('rootNavigation')}
                              logOut={this.logOut}/>
      // return <HomeScreen />
    }
  }

  render() {
    return (
      <NavigationProvider router={Router}>
        {this.renderLink()}
      </NavigationProvider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});


const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps)(App);
