import _ from "lodash";
import {
    CREATE_SUBCATEGORY,
    FETCH_SUBCATEGORIES,
    FETCH_SUBCATEGORY,
    EDIT_SUBCATEGORY,
    DELETE_SUBCATEGORY
} from "../actions/types";

export default (state = {}, action) => {
    console.log("Action values from reducer 1:",action.type);
     switch (action.type) {
         case CREATE_SUBCATEGORY:
             console.log("Action values from reducer 2:",state);
             return {...state, [action.payload.id] : action.payload}
         case FETCH_SUBCATEGORIES:
             return {...state, ..._.mapKeys(action.payload, '_id')}
         default:
              return state;
     }
}