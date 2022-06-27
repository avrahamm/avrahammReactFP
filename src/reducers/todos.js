import {ADD_USER, DELETE_USER} from "../actions/users";
import {ADD_TODO, SET_TODO_STATUS} from "../actions/todos";

export default function todos(state = {
    todos:{},
}, action) {
    // action={type:'ADD', 'newData':data }
    switch (action.type) {
        case DELETE_USER : {
            let userId = action.userId;
            state = {...state}; // mutation and broadcasting
            state.todos = {...state.todos};
            delete  state.todos[userId];
            return state;
        }

        // { type: 'ADD_TODO',userId:userId, title: title }

        case ADD_TODO : {
            const {id, userId, title} = action;
            state = {...state}; // mutation and broadcasting
            state.todos = {...state.todos};
            state.todos[userId][id] = {
                id,
                userId,
                title,
                completed:false
            };
            return state;
        }

        case ADD_USER : {
            let newUserId = action.id;
            state = {...state}; // mutation and broadcasting
            state.todos = {...state.todos};
            state.todos[newUserId] = {};
            return state;
        }

        case SET_TODO_STATUS : {
            let userId = action.userId;
            let todoId = action.todoId;
            let completedValue = action.completedValue;
            state = {...state}; // mutation and broadcasting
            state.todos = {...state.todos};
            state.todos[userId] = {...state.todos[userId]};
            // mutate updated item
            let updatedTodo = { ...state.todos[userId][todoId]};
            updatedTodo.completed = completedValue;
            state.todos[userId][todoId] = updatedTodo;
            return state;
        }

        default :
            return state
    }
}
