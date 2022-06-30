import {ADD_POST, INIT_SELECTED_USER_POSTS} from "../actions/posts";
import {SELECT_USER} from "../actions/users";

export default function posts(state = {
    // selected user posts object
    posts:{},
    // to make difference between mounting
    // and loading initial data,
    //  and redirecting after AddPost.
    initialized: false
}, action) {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case INIT_SELECTED_USER_POSTS: {
            const {posts} = action;
            // mutation and broadcasting
            state = {...state, posts: posts, initialized: true};
            return state;
        }

        case SELECT_USER : {
            return {...state, initialized: false};
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
