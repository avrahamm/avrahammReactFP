import {ADD_USER, DELETE_USER} from "../actions/users";
import {ADD_POST} from "../actions/posts";

export default function posts(state = {
    posts:{},
}, action) {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case DELETE_USER : {
            let userId = action.userId;
            state = {...state}; // mutation and broadcasting
            state.posts = {...state.posts};
            delete  state.posts[userId];
            return state;
        }

        // { type: 'ADD_POST',userId:userId, title: title, body:body }
        case ADD_POST : {
            const {id, userId, title, body} = action;
            state = {...state}; // mutation and broadcasting
            state.posts = {...state.posts};
            state.posts[userId][id] = {
                id,
                userId,
                title,
                body,
            };
            return state;
        }

        case ADD_USER : {
            let newUserId = action.id;
            state = {...state}; // mutation and broadcasting
            state.posts = {...state.posts};
            state.posts[newUserId] = {};
            return state;
        }

        default :
            return state
    }
}
