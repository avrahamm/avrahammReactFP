/**
 * Filter Reducer to hold app search string.
 * @param state
 * @param action
 * @returns {searchString}: {searchString: string}
 */
import {SET_SEARCH_STRING} from "../actions/filter";

const filter = (state = {
    searchString:"",
}, action) => {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        //{ type: 'SET_SEARCH_STRING', searchString: searchString}
        case SET_SEARCH_STRING : {
            state = {...state}; // mutation and broadcasting
            state.searchString = action.searchString;
            return state;
        }
        default :
            return state
    }
}

export default filter;
