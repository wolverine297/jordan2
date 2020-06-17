import {MEALS} from '../../data/dummy-data';
import { TOGGLE_FAVOURITE, SET_FILTERS } from '../action/meals';

const initialstate = {
    meals: MEALS,
    filteredMeals: MEALS,
    favouritesMeals: []
};

const mealReducer = (state=initialstate,action) => {
    switch(action.type){
        case TOGGLE_FAVOURITE:
            const existingindex = state.favouritesMeals.findIndex(meal => meal.id === action.mealId)
            if(existingindex>=0){
                const updatedFavMeals = [...state.favouritesMeals];
                updatedFavMeals.splice(existingindex,1);
                return{ ...state,favouritesMeals: updatedFavMeals};
            }else{
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state,favouritesMeals:state.favouritesMeals.concat(meal)};
            }
        case SET_FILTERS:
            const appliedfilters = action.filters;
            const filteredMeals = state.meals.filter(meal => {
         if(appliedfilters.glutenfree && !meal.isGlutenfree){
             return false;
         }
         if(appliedfilters.lactosefree && !meal.isLactosefree){
            return false;
        }
        if(appliedfilters.vegetarian && !meal.isVegetarian){
            return false;
        }
        if(appliedfilters.vegan && !meal.isVegan){
            return false;
        }
        return true;
            });  
        return {...state,filteredMeals:filteredMeals};    
        default:
            return state;
    }
    
}

export default mealReducer;