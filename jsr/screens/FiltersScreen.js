import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Switch,Platform} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import {setFilters} from '../store/action/meals';
import {useDispatch} from 'react-redux';

const Filterswitch = props => {
return (
    <View style = {styles.filterContainer}>
    <Text>{props.label}</Text>
    <Switch thumbColor = {Platform.OS === 'android' ? Colors.primaryColor : ''} trackColor = {{true:Colors.primaryColor}} value = {props.state} onValueChange = {props.onChange} />
    </View>
);
}

const FiltersScreen = props => {
    const {navigation} = props;
    const [isglutenfree,setisglutenfree] = useState(false);
    const [islactosefree,setislactosefree] = useState(false);
    const [isvegan,setisvegan] = useState(false);
    const [isvegetarian,setisvegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedfilters = {
            glutenfree:isglutenfree,
            lactosefree:islactosefree,
            vegan: isvegan,
            vegetarian:isvegetarian
        };
        dispatch(setFilters(appliedfilters));
    },[isglutenfree,islactosefree,isvegan,isvegetarian,dispatch]);
    useEffect(() => {
       navigation.setParams({save:saveFilters});
    },[saveFilters]);
return(
    <View style = {styles.screen}>
    <Text style = {styles.text}>Available Filters</Text>
    <Filterswitch label = 'Gluten-free' state = {isglutenfree} onChange = {newValue => setisglutenfree(newValue)} />
    <Filterswitch label = 'Lactose-free' state = {islactosefree} onChange = {newValue => setislactosefree(newValue)} />
    <Filterswitch label = 'Vegan' state = {isvegan} onChange = {newValue => setisvegan(newValue)} />
    <Filterswitch label = 'Vegetarian' state = {isvegetarian} onChange = {newValue => setisvegetarian(newValue)} />
    </View>
);
};

FiltersScreen.navigationOptions = navData => {
    return{
    title: 'Your Filters',
    headerLeft: ()=> (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
    <Item title = "Menu" iconName = 'ios-menu' onPress = {() => {
        navData.navigation.toggleDrawer();
    }} />
    </HeaderButtons>
    ),
    headerRight: ()=> (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
        <Item title = "Save" iconName = 'ios-save' onPress = { 
            navData.navigation.getParam('save')
        } />
        </HeaderButtons>
    )
    };
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    },
    text:{
        fontFamily: 'open-sans-bold',
        fontSize:22,
        margin:20,
        textAlign:'center'
    },
    filterContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: '80%',
        marginVertical:15
    }
});

export default FiltersScreen;