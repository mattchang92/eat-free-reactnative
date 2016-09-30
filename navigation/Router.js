import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import RecipeListScreen from './components/RecipeListScreen';
import RecipeDetailsScreen from './components/RecipeDetailsScreen';
// import {
//   NavigationProvider,
//   StackNavigation,
//   createRouter,
// } from '@exponent/ex-navigation';



export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  list: () => RecipeListScreen,
  details: () => RecipeDetailsScreen,
}));
