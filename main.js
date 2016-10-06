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

import RecipeListItem from './components/RecipeListItem';


import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
    userPresent: this.props.userPresent || false
  }

  componentWillMount() {
    this._loadAssetsAsync();
    this.checkUserPresent();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/images/exponent-wordmark.png'),
        ],
        fonts: [
          {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
        ],
      });
    } catch(e) {
      console.warn(`There was an error caching assets (see: main.js), perhaps due to a network timeout, so we skipped caching. Reload the app to try again.`);
    } finally {
      this.setState({appIsReady: true});
    }
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

    if (!this.state.appIsReady) {
      return <Exponent.Components.AppLoading />;
    }

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

Exponent.registerRootComponent(AppContainer);
