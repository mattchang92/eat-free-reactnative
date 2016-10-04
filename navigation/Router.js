import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import RecipeListScreen from '../screens/RecipeListScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
// import {
//   NavigationProvider,
//   StackNavigation,
//   createRouter,
// } from '@exponent/ex-navigation';



export default createRouter(() => ({
  home: () => HomeScreen,
  login: () => LoginScreen,
  signup: () => SignupScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  list: () => RecipeListScreen,
  details: () => RecipeDetailsScreen,
}));
