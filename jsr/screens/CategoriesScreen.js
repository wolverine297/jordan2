import React from 'react';
import {View,Text,StyleSheet, Button,FlatList,TouchableOpacity} from 'react-native';
import {CATEGORIES} from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';


const CategoriesScreen = props => {
    const rendergriditem = (itemdata) => {
        return(
        <CategoryGridTile title = {itemdata.item.title} color = {itemdata.item.color} onSelect = {() => {
            props.navigation.navigate({routeName: 'CategoryMeal',params:{
                categoryId: itemdata.item.id
            }});
        }}/>
        );
    
};
return (
   <FlatList keyExtractor = {(item,index) => item.id} data = {CATEGORIES} renderItem = {rendergriditem} numColumns = {2} />
);
};

CategoriesScreen.navigationOptions = navData => {
    return{
    title: 'Meal Categories',
    headerLeft: () => (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
    <Item title = "Menu" iconName = 'ios-menu' onPress = {() => {
        navData.navigation.toggleDrawer();
    }} />
    </HeaderButtons>
    )
    };
};


const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default CategoriesScreen;