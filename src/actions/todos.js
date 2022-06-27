import {createTodo, setTodoStatus} from '../Utils/api';

export const SET_SELECTED_USER_TODOS = 'SET_SELECTED_USER_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const SET_TODO_STATUS = 'SET_TODO_STATUS';

export function setSelectedUserTodosAction (todos) {
  return {
    type: SET_SELECTED_USER_TODOS,
    todos
  }
}

export function addTodoAction ({id, userId, title}) {
  return {
    type: ADD_TODO,
    id, userId, title
  }
}

export function setTodoStatusAction({userId, todoId, completedValue}) {
  return {
    type: SET_TODO_STATUS,
    userId, todoId, completedValue
  }
}

export function handleAddTodoThunk(userId, title) {
  return (dispatch) => {
    return createTodo({userId, title})
        .then((newTodo) => dispatch(addTodoAction(newTodo)))
  }
}

export function handleSetTodoStatusThunk(userId, todoId, completedValue) {
  return (dispatch) => {
    return setTodoStatus({userId, todoId, completedValue})
        .then((updatedTodo) => dispatch(setTodoStatusAction(updatedTodo)))
  }
}
