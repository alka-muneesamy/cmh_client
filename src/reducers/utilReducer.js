import _ from "lodash";
import { FETCH_CATEGORIES_NAME } from "../actions/types";

const utilReducer = (state = {}, action ) => {
    console.log("Action:",action.type);

    switch (action.type)
   {
     case FETCH_CATEGORIES_NAME :
        console.log("State value from reducer:",action.payload);
        return {...state, categoryName:action.payload};     
    default: 
        return state;
    }  
}

export default utilReducer;