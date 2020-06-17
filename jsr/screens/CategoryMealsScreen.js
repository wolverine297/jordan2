import React from 'react';
import {useSelector} from 'react-redux';
import {View,StyleSheet} from 'react-native';
import {CATEGORIES,MEALS} from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreensScreen = props => {
    const catId = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedmeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId)>=0
    );
    if(displayedmeals.length === 0){
        return <View style = {styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
        </View>
    }
    return <MealList displayedmeals = {displayedmeals} navigation = {props.navigation} />
};

CategoryMealsScreensScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedcategory = CATEGORIES.find(cat => cat.id === catId)
    return{
        headerTitle: selectedcategory.title,
       
    };
};

const styles = StyleSheet.create({
    content:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center'
    }
})

export default CategoryMealsScreensScreen;