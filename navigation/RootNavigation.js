import React, {
  PropTypes
} from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
  Ionicons,
} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import Router from '../navigation/Router';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {


  render() {
    return (
      <TabNavigation
        tabBarHeight={56}
        initialTab="list">
        <TabNavigationItem
          id="list"
          renderIcon={isSelected => this._renderIcon('home', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('list')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="login"
          renderIcon={isSelected => this._renderIcon('book', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('list')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="details"
          renderIcon={isSelected => this._renderIonicon('My Profile', 'ios-person-outline', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('login')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="logout"
          renderIcon={isSelected => this._renderIonicon('Log Out', 'ios-person-outline', isSelected)}
          onPress={this.logOut}>
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  logOut() {
    AsyncStorage.removeItem('UserApiKey')
    //this.props.navigator.push(Router.getRoute('home'));
    console.log("nav log out", this.props)
  }

  _renderIonicon(title: string, iconName: string, isSelected: bool): ReactElement<any> {
    let color = isSelected ? Colors.tabIconSelected : Colors.tabIconDefault;

    return (
      <View style={styles.tabItemContainer}>
        <Ionicons name={iconName} size={32} color={color} />

        <Text style={[styles.tabTitleText, {color}]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
  tabItemContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  },
  tabTitleText: {
    fontSize: 11,
  }
});
