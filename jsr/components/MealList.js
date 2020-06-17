import React from 'react';
import {View,FlatList,StyleSheet} from 'react-native';
import MealItem from './MealItem';
import {useSelector} from 'react-redux';

const MealList = props => {
    const favouritesMeals = useSelector(state => state.meals.favouritesMeals); 
    const rendermealitem = itemData => {
        const isFavourite = favouritesMeals.some(meal => meal.id === itemData.item.id);
        return(
          <MealItem title = {itemData.item.title} duration = {itemData.item.duration} complexity = {itemData.item.complexity} affordability = {itemData.item.affordability} image = {itemData.item.imageUrl} onSelectMeal = {() => {
             props.navigation.navigate({routeName: 'MealDetail',params:{
                 mealId: itemData.item.id,
                 mealTitle:itemData.item.title,
                 isFav: isFavourite
             }})   
          }} />
        );
    };
    return(
        <View style = {styles.screen}>
        <FlatList data = {props.displayedmeals} keyExtractor = {(item,index) => item.id} renderItem = {rendermealitem} style = {{width:'100%'}}/>
         </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        padding:15
    }
});

export default MealList;