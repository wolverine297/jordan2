import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import DefaultText from './DefaultText';

const MealItem = props => {
    return(
        <View style = {styles.mealItem}>
        <TouchableOpacity onPress = {props.onSelectMeal}>
        <View>
        <View style = {{...styles.mealrow,...styles.mealHeader}}>
        <ImageBackground source = {{uri: props.image}} style = {styles.bgimage} >
        <View style = {styles.titleContainer}>
        <Text style = {styles.title} numberOfLines = {1}>{props.title}</Text>
        </View>
        </ImageBackground>
        </View>
        <View style = {{...styles.mealrow,...styles.mealDetail}}>
        <DefaultText>{props.duration}m</DefaultText>
        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
        </View>
        </View>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mealrow:{
        flexDirection:'row',
    },
    mealItem:{
        height:200,
        width: '100%',
        backgroundColor:'#f5f5f5',
        borderRadius: 10,
        overflow:'hidden',
        marginVertical: 10
    },
    bgimage:{
        width: '100%',
        height: '100%',
        justifyContent:'flex-end'
    },
    mealHeader:{
        height: '85%'
    },
    mealDetail:{
 paddingHorizontal:10,
 justifyContent:'space-between',
 alignItems:'center',
 height:'15%'
    },
    titleContainer:{
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20,
        color: 'white',
        textAlign:'center'
    }
});

export default MealItem;