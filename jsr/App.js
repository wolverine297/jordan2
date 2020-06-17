import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import Meals from './navigation/MealsNavigator';
import {createStore,combineReducers} from 'redux';
import mealsReducer from './store/reducer/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded,setfontLoaded] = useState(false);

  if(!fontLoaded){
    return (<AppLoading startAsync = {fetchFonts} onFinish = {() => setfontLoaded(true)} />
    );
  }
  return (
    <Provider store={store}><Meals /></Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

