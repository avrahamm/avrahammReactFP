import {ADD_TODO, INIT_SELECTED_USER_TODOS, SET_TODO_STATUS} from "../actions/todos";
import {SELECT_USER} from "../actions/users";

export default function todos(state = {
    // selected user todos object
    todos:{},
    // to make difference between mounting
    // and loading initial data,
    //  and redirecting after AddTodo.
    initialized: false
}, action) {
    switch (action.type) {
        case INIT_SELECTED_USER_TODOS: {
            const {todos} = action;
            // mutation and broadcasting
            state = {...state,todos:todos, initialized: true};
            return state;
        }

        case SELECT_USER : {
            return {...state, initialized: false};
        }

        case ADD_TODO : {
            const {id, userId, title} = action;
            state = {...state}; // mutation and broadcasting
            state.todos = {...state.todos};
            state.todos[id] = {
                id,
                userId,
                title,
                completed:false
            };
            return state;
        }

        case SET_TODO_STATUS : {
            const { todoId, completedValue } = action;
            state = {...state}; // mutation and broadcasting
            state.todos = {...state.todos};
            // mutate updated item
            let updatedTodo = { ...state.todos[todoId]};
            updatedTodo.completed = completedValue;
            state.todos[todoId] = updatedTodo;
            return state;
        }

        default :
            return state
    }
}
