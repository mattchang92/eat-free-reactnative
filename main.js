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
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import RecipeListItem from './components/RecipeListItem';
import recipes from './data';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
    recipes,
  }

  componentWillMount() {
    this._loadAssetsAsync();
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

  render() {
    // if (this.state.appIsReady) {
    //   let { notification } = this.props.exp;
    //   let initialRoute = Router.getRoute('rootNavigation', {notification});
    //
    //   return (
    //     <View style={styles.container}>
    //       <NavigationProvider router={Router}>
    //         <StackNavigation
    //           id="root"
    //           initialRoute={initialRoute}
    //         />
    //       </NavigationProvider>
    //
    //     </View>
    //   );
    // } else {
    //   return <Exponent.Components.AppLoading />;
    // }
    if (!this.state.appIsReady) {
      return <Exponent.Components.AppLoading />;
    }

    return <RecipeDetails />;
    // return <RecipeList />;
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
