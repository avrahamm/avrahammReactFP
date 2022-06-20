/**
 * Main Reducer to hold app state.
 * @param state
 * @param action
 * @returns {{searchString: string, maxTodoId: number, maxPostId: number, todos: Array, maxUserId: number, posts: Array, users: Array, selectedUserId: number}|({searchString, maxTodoId, maxPostId, todos, maxUserId, posts, users, selectedUserId}&{maxUserId: *, users: *})|({searchString, maxTodoId, maxPostId, todos, maxUserId, posts, users, selectedUserId}&{maxUserId, users})|*|({searchString, maxTodoId, maxPostId, todos, maxUserId, posts, users, selectedUserId}&{maxUserId, users}&{selectedUserId: *})|*}
 */
const mainreducer = (state = {
    users:[], // users
    posts:[], // posts
    todos:[], //todos
    searchString:"",
    selectedUserId:0, // users
    maxUserId:0, // users
    maxPostId:0, // posts
    maxTodoId:0, //todos
}, action) => {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case 'INIT_USERS' : {
            let rawUsersData = action.newData;
            let [maxUserId,usersDataByUserId] = getUsersDataByUserId(rawUsersData);
            state = {...state,users:usersDataByUserId,maxUserId:maxUserId};
            return state;
        }

        case 'INIT_POSTS' : {
            let posts = action.newData;
            let userIdPostsArray = [], maxPostId = 0;

            [maxPostId,userIdPostsArray] = groupItemsByUserId(posts, state.users);
            let key = 'posts';
            // state = {...state,[key]:userIdPostsArray};
            state[key] = userIdPostsArray;// no mutation,no broadcasting
            state.maxPostId = maxPostId;
            return state;
        }

        case 'INIT_TODOS' : {
            let todos = action.newData;
            let userIdTodosArray = [], maxTodoId = 0;
            [maxTodoId,userIdTodosArray]= groupItemsByUserId(todos, state.users);
            let key = 'todos';
            // state = {...state,[key]:userIdTodosArray};
            state[key] = userIdTodosArray; // no mutation,no broadcasting
            state.maxTodoId = maxTodoId;
            return state;
        }
        case 'INIT_COMMIT' : {
            // broadcast when todos and posts are ready to save unneeded re rendering.
            state = {...state}; // mutation and broadcasting
            return state;
        }

        //{ type: 'SET_SEARCH_STRING', searchString: searchString}
        case 'SET_SEARCH_STRING' : {
            state = {...state}; // mutation and broadcasting
            state.searchString = action.searchString;
            return state;
        }
        case 'UPDATE_USER' : {
            let updatedUserData = action.updatedUserData;
            let updatedUserId = updatedUserData.userId;

            state = {...state}; // mutation and broadcasting
            let curUser = state.users[updatedUserId];
            let updatedUser = getUpdatedUser(curUser,updatedUserData);
            state.users[updatedUserId] = {...updatedUser};
            return state;
        }
        case 'DELETE_USER' : {
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

        case 'ADD_TODO' : {
            let userId = action.userId;
            let title = action.title;
            state = {...state}; // mutation and broadcasting
            let newTodoId = state.maxTodoId+1;
            let newTodo = {
                id:newTodoId,
                userId:userId,
                title:title,
                completed:false
            };
            state.maxTodoId++;
            state.todos[userId].push(newTodo);
            return state;
        }

        // { type: 'ADD_POST',userId:userId, title: title, body:body }
        case 'ADD_POST' : {
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

        case 'ADD_USER' : {
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
            state.todos[newUserId] = [];
            state.posts[newUserId] = [];
            return state;
        }

        case 'SET_TODO_STATUS' : {
            let userId = action.userId;
            let todoId = action.todoId;
            let completedValue = action.completedValue;
            state = {...state}; // mutation and broadcasting
            state.todos = [...state.todos];
            state.todos[userId] = [...state.todos[userId]];
            let updatedTodoIndex = state.todos[userId].findIndex((todo) =>
            {
                return todo.id === todoId;
            });
            // mutate updated item
            let updatedTodo = {...state.todos[userId][updatedTodoIndex]};
            updatedTodo.completed = completedValue;
            state.todos[userId][updatedTodoIndex] = updatedTodo;
            return state;
        }

        case 'SELECT_USER' : {
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

export default mainreducer;