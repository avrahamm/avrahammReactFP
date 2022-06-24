import {ADD_USER, DELETE_USER, INIT_USERS, SELECT_USER, UPDATE_USER} from "../actions/users";

export default function users(state = {
    users:[],
    maxUserId: 0,
    selectedUserId:0
}, action) {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case INIT_USERS : {
            let rawUsersData = action.newData;
            let [maxUserId,usersDataByUserId] = getUsersDataByUserId(rawUsersData);
            state = {...state,users:usersDataByUserId,maxUserId:maxUserId};
            return state;
        }

        case UPDATE_USER : {
            //TODO! refactor with thunk handleUpdateUser
            let updatedUserData = action.updatedUserData;
            let updatedUserId = updatedUserData.userId;

            state = {...state}; // mutation and broadcasting
            let curUser = state.users[updatedUserId];
            let updatedUser = getUpdatedUser(curUser,updatedUserData);
            state.users[updatedUserId] = {...updatedUser};
            return state;
        }
        case DELETE_USER : {
            //TODO! refactor with thunk handleDeleteUser
            /**
             * delete operator causes deleted cells to appear as "undefined".
             */
            let userId = action.userId;
            state = {...state}; // mutation and broadcasting
            if (userId === state.selectedUserId){
                state.selectedUserId = 0;
            }
            delete  state.posts[userId];
            delete  state.todos[userId];
            delete  state.users[userId];
            return state;
        }

        // { type: 'ADD_TODO',userId:userId, title: title }

        case ADD_USER : {
            //TODO! refactor with thunk handleAddUser
            let name = action.name;
            let email = action.email;
            state = {...state}; // mutation and broadcasting
            let newUserId = state.maxUserId+1;
            let newUser = {
                id:newUserId,
                name:name,
                email:email,
                address:{
                    street:"",
                    city:"",
                    zipcode:""
                }
            };
            state.maxUserId++;
            state.users[newUserId] = newUser;
            //TODO! move to respective reducers
            // state.todos[newUserId] = [];
            // state.posts[newUserId] = [];
            return state;
        }

        case SELECT_USER : {
            // { type : 'SELECT_USER', userId : this.state.userId}
            let selectedUserId = action.userId;
            return {...state, selectedUserId:selectedUserId};
        }
        default :
            return state
    }
}


function getUsersDataByUserId(rawUsersData) {
    let usersDataByUserId = [];
    let maxUserId = 0;
    rawUsersData.forEach(user=>
    {
        usersDataByUserId[user.id] = user;
        if ( user.id > maxUserId){
            maxUserId = user.id;
        }
    });
    return [maxUserId,usersDataByUserId];
}

function getUpdatedUser(curUser,updatedUserData) {

    let personalKeys = ['name','email'];
    let addressKeys = ['street','city','zipcode'];

    personalKeys.forEach(key =>
    {
        curUser[key] = updatedUserData[key];
    });

    addressKeys.forEach(key =>
    {
        curUser.address[key] = updatedUserData[key];
    });
     return curUser;
}