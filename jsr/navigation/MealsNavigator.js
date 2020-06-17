import React from 'react';
import {Platform,Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {Ionicons} from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FiltersScreen from '../screens/FiltersScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import Colors from '../constants/Colors';


const MealsNavigator = createStackNavigator({
 Categories: {
     screen:CategoriesScreen,
 },
 CategoryMeal: {
     screen: CategoryMealsScreen,
 },
 MealDetail:{
  screen: MealDetailsScreen
 }
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: 'white'
        },
        headerTitleStyle:{
          fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle:{
          fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white': Colors.primaryColor
    }
});

const FavNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetail: MealDetailsScreen
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white': Colors.primaryColor
    }
})

const tabscreenConfig = {
    Meals: {screen:MealsNavigator,navigationOptions:{
        tabBarIcon: tabInfo => {
            return (<Ionicons name = 'ios-restaurant' size = {25} color = {tabInfo.tintColor} />);
        }
    },
    tabBarColor: Colors.primaryColor,
    tabBarLabel:Platform.OS === 'android' ? <Text style = {{fontFamily:'open-sans-bold'}}>Meals</Text> : 'Meals'
},
    Favourites:{screen: FavNavigator, navigationOptions: {
        tabBarLabel: 'Favourites!!!',
        tabBarIcon: tabInfo => {
            return (<Ionicons name = 'ios-star' size = {25} color = {tabInfo.tintColor} />);
        }
    },
    tabBarColor: Colors.primaryColor,
    tabBarLabel:Platform.OS === 'android' ? <Text style = {{fontFamily:'open-sans-bold'}}>Favourites</Text> : 'Favourites'
}
};

const MealFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabscreenConfig,{
    activeTintColor:'white',
    shifting:true,
    barStyle:{
        backgroundColor: Colors.primaryColor
    }

}) : createBottomTabNavigator(
    tabscreenConfig,{
    tabBarOptions:{
        labelStyle:{
          fontFamily: 'open-sans'
        },
        activeTintColor:Colors.accentColor
    },
    
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},{
    navigationOptions:{
 drawerLabel:'Filters!!!!'
    },
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: 'white'
            },
            headerTintColor: Platform.OS === 'android' ? 'white': Colors.primaryColor
        }
    });

const MainNavigator = createDrawerNavigator({
    MealsFav: {screen:MealFavTabNavigator,navigationOptions:{
        drawerLabel:'Meals'
    }},
    Filters:FiltersNavigator
},
{
    contentOptions:{
        activeTintColor: Colors.primaryColor,
        labelStyle:{
            fontFamily: 'open-sans'
        }
    }
}
);

export default createAppContainer(MainNavigator);