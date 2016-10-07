import Exponent from 'exponent';
import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import RecipeListItem from './RecipeListItem';


import Router from '../../navigation/Router';

class App extends React.Component {
  state = {
    appIsReady: false,
    userPresent: this.props.userPresent || false
  }

  componentWillMount() {
    this.checkUserPresent();
  }


  checkUserPresent() {
    AsyncStorage.getItem('UserApiKey')
      .then( response => {
        if (response !== null) {
          this.setState({userPresent: true})
        } else {
          this.setState({userPresent: false})
        }
      })
  }

  logOut() {
    // AsyncStorage.removeItem('UserApiKey')
    //   .then(this.setState({userPresent: false}))
    console.log("logged out")
  }

  renderLink() {
    if (this.state.userPresent) {
      return <StackNavigation initialRoute={Router.getRoute('rootNavigation')}
                              logOut={this.logOut}/>
    } else {
      return <StackNavigation initialRoute={Router.getRoute('home')} />
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

export default App

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
