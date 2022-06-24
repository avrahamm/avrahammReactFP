import {ADD_USER, DELETE_USER} from "../actions/users";
import {ADD_TODO, INIT_TODOS, SET_TODO_STATUS} from "../actions/todos";

export default function todos(state = {
    todos:[], //todos
    maxTodoId:0, //todos
}, action) {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case INIT_TODOS : {
            let todos = action.newData;
            let userIdTodosArray = [], maxTodoId = 0;
            [maxTodoId,userIdTodosArray]= groupItemsByUserId(todos, state.users);
            let key = 'todos';
            // state = {...state,[key]:userIdTodosArray};
            state[key] = userIdTodosArray; // no mutation,no broadcasting
            state.maxTodoId = maxTodoId;
            return state;
        }

        case DELETE_USER : {
            /**
             * delete operator causes deleted cells to appear as "undefined".
             */
            //TODO! after thunk handleDeleteUser completed
            let userId = action.userId;
            state = {...state}; // mutation and broadcasting
            delete  state.todos[userId];
            return state;
        }

        // { type: 'ADD_TODO',userId:userId, title: title }

        case ADD_TODO : {
            //TODO! after thunk handleAddTodo completed
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

        case ADD_USER : {
            //TODO! after thunk handleAddUser completed
            let newUserId = action.newUserId;
            state = {...state}; // mutation and broadcasting
            state.todos[newUserId] = [];
            return state;
        }


        case SET_TODO_STATUS : {
            //TODO! after thunk handleSetTodoStatus completed
            let userId = action.userId;
            let todoId = action.todoId;
            let completedValue = action.completedValue;
            let updatedTodoIndex = state.todos[userId].findIndex((todo) =>
            {
                return todo.id === todoId;
            });

            // mutate updated item
            let updatedTodo = {...state.todos[userId][updatedTodoIndex]};
            updatedTodo.completed = completedValue;
            state.todos[userId][updatedTodoIndex] = updatedTodo;
            state = {...state}; // mutation and broadcasting
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
