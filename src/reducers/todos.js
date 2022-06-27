import {ADD_TODO, SET_SELECTED_USER_TODOS, SET_TODO_STATUS} from "../actions/todos";

export default function todos(state = {
    // selected user todos object
    todos:{},
}, action) {
    switch (action.type) {
        case SET_SELECTED_USER_TODOS: {
            const {todos} = action;
            state = {...state,todos:todos}; // mutation and broadcasting
            return state;
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
