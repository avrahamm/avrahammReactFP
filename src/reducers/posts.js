import {ADD_POST, SET_SELECTED_USER_POSTS} from "../actions/posts";

export default function posts(state = {
    // selected user posts object
    posts:{},
}, action) {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case SET_SELECTED_USER_POSTS: {
            const {posts} = action;
            state = {...state, posts: posts}; // mutation and broadcasting
            return state;
        }

        case ADD_POST: {
            const {id, userId, title, body} = action;
            state = {...state}; // mutation and broadcasting
            state.posts = {...state.posts};
            state.posts[id] = {
                id,
                userId,
                title,
                body,
            };
            return state;
        }

        default :
            return state
    }
}
