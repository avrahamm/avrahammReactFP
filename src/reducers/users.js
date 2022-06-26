import {
    ADD_USER, DELETE_USER, INIT_USERS,
    SELECT_USER, UPDATE_USER
} from "../actions/users";

export default function users(state = {
    users: {},
    selectedUserId:0
}, action) {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case INIT_USERS : {
            state = {...state,users:action.newData};
            return state;
        }

        case UPDATE_USER : {
            let updatedUserData = action.updatedUserData;
            let updatedUserId = updatedUserData.userId;

            state = {...state}; // mutation and broadcasting
            state.users = {...state.users};
            let curUser = state.users[updatedUserId];
            let updatedUser = getUpdatedUser(curUser,updatedUserData);
            state.users[updatedUserId] = {...updatedUser};
            return state;
        }
        case DELETE_USER : {
            let userId = action.userId;
            if (userId === state.selectedUserId){
                state.selectedUserId = 0;
            }
            state = {...state}; // mutation and broadcasting
            state.users = {...state.users}
            delete  state.users[userId];
            return state;
        }

        // { type: 'ADD_TODO',userId:userId, title: title }

        case ADD_USER : {
            const {id, name, email} = action;
            state = {...state}; // mutation and broadcasting
            state.users = {...state.users}
            state.users[id] = {
                id,
                name,
                email,
                address:{
                    street:"",
                    city:"",
                    zipcode:""
                }
            };
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