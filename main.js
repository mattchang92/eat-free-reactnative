import Exponent from 'exponent';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers'
import App from './src/components/App'

import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
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

    if (!this.state.appIsReady) {
      return <Exponent.Components.AppLoading />;
    }

    return (
      <Provider store={createStore(reducers)}>
        <App />
      </Provider>
    )
  }
}


Exponent.registerRootComponent(AppContainer);
