import React,{useEffect,useCallback} from 'react';
import {ScrollView,View,Text,StyleSheet, Button,Image} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {toggleFavourite} from '../store/action/meals';


const ListItem = props => {
    return(
        <View style = {styles.list}>
        <DefaultText>{props.children}</DefaultText>
        </View>
    );
}

const MealDetailsScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const currentmealisfavourite = useSelector(state => state.meals.favouritesMeals.some(meal => meal.id === mealId));
    const mealId = props.navigation.getParam('mealId');

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    
    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId));
    },[dispatch,mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav:toggleFavouriteHandler});
    },[toggleFavouriteHandler]);

    useEffect(() => {
         props.navigation.setParams({isFav: currentmealisfavourite});
    },[currentmealisfavourite])
    
return(
    <ScrollView>
    <Image source = {{uri: selectedMeal.imageUrl}} style = {styles.image}/>
    <View style = {styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
        <Text style = {styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(ingredient => <ListItem key = {ingredient}>{ingredient}</ListItem>)}
        <Text style = {styles.title}>Steps</Text>
        {selectedMeal.steps.map(step => <ListItem key = {step}>{step}</ListItem>)}
    </ScrollView>
);
};

MealDetailsScreen.navigationOptions = (navigationData) => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavourites = navigationData.navigation.getParam('toggleFav');
    const isFavourite = navigationData.navigation.getParam('isFav');
    return{
         headerTitle: mealTitle,
         headerRight:()=> (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
         <Item title = 'Favourite' iconName = {isFavourite ? 'ios-star' : 'ios-star' } onPress = {toggleFavourites} />
         </HeaderButtons>
         )
    };
};

const styles = StyleSheet.create({
   details:{
       flexDirection:'row',
       padding:15,
       justifyContent:'space-around'
       },
       image:{
           width: '100%',
           height:200
       },
       title:{
           fontFamily:'open-sans-bold',
           fontSize:22,
           textAlign:'center'
       },
       list:{
           marginVertical:10,
           marginHorizontal:20,
           borderColor:'#ccc',
           borderWidth: 1,
           padding:10
       }
});

export default MealDetailsScreen;