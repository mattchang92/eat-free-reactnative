import React, {
  PropTypes
} from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  AsyncStorage,
  View,
  Text,
} from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  Ionicons,
} from '@exponent/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../src/actions';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import Router from '../navigation/Router';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

class RootNavigation extends React.Component {

  componentWillMount() {
    this.props.updateFoodlog();
  }

  render() {
    return (
      <TabNavigation
        tabBarHeight={56}
        initialTab="foodlog">
        <TabNavigationItem
          id="list"
          renderIcon={isSelected => this._renderIonicon('Recipe List', 'ios-list-box-outline', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('list')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="foodlog"
          renderIcon={isSelected => this._renderIonicon('Food Log', 'ios-bookmarks', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('foodlog')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="details"
          renderIcon={isSelected => this._renderIonicon('My Profile', 'ios-person-outline', isSelected)}>
          <StackNavigation initialRoute={Router.getRoute('login')} />
        </TabNavigationItem>

        <TabNavigationItem
          id="logout"
          renderIcon={isSelected => this._renderIonicon('Log Out', 'ios-log-out', isSelected)}
          onPress={this.logOut.bind(this)}>
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  logOut() {
    AsyncStorage.removeItem('UserApiKey');
    this.props.logoutUser();
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

export default connect(null, actions)(RootNavigation);
