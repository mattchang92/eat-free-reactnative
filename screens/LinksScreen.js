import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import RecipeListItem from '../components/RecipeListItem';
import recipes from '../data';
import RecipeList from '../components/RecipeList';

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'All Recipes',
    },
  }
  render() {
    return <RecipeList />;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
