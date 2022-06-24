import {ADD_USER, DELETE_USER} from "../actions/users";
import {ADD_POST, INIT_POSTS} from "../actions/posts";

export default function posts(state = {
    posts:[],
    maxPostId: 0
}, action) {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case INIT_POSTS : {
            let posts = action.newData;
            let userIdPostsArray = [], maxPostId = 0;

            [maxPostId,userIdPostsArray] = groupItemsByUserId(posts, state.users);
            let key = 'posts';
            // state = {...state,[key]:userIdPostsArray};
            state[key] = userIdPostsArray;// no mutation,no broadcasting
            state.maxPostId = maxPostId;
            return state;
        }

        case DELETE_USER : {
            let userId = action.userId;
            state = {...state}; // mutation and broadcasting
            delete  state.posts[userId];
            return state;
        }

        // { type: 'ADD_POST',userId:userId, title: title, body:body }
        case ADD_POST : {
            //TODO! after thunk handleAddPost completed
            let userId = action.userId;
            let title = action.title;
            let body = action.body;
            state = {...state}; // mutation and broadcasting
            let newPostId = state.maxPostId+1;
            let newPost = {
                id:newPostId,
                userId:userId,
                title:title,
                body:body
            };
            state.maxPostId++;
            state.posts[userId].push(newPost);
            return state;
        }

        case ADD_USER : {
            let newUserId = action.id;
            state = {...state}; // mutation and broadcasting
            state.posts[newUserId] = [];
            return state;
        }

        default :
            return state
    }
}

function groupItemsByUserId(data,users) {
    let maxItemId = 0;
    const reducer = (userIdItemsArray, item) => {
        let userId = item.userId;
        let id = item.id;
        if(id > maxItemId){
            maxItemId = id;
        }
        userIdItemsArray[userId].push(item);
        return userIdItemsArray;
    };

    let userIdItemsArray = [];
    users.forEach( user =>
    {
        userIdItemsArray[user.id] = [];
    });

    userIdItemsArray = data.reduce(reducer, userIdItemsArray);
    return [maxItemId,userIdItemsArray];
}
