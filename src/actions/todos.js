import {createTodo, setTodoStatus} from '../Utils/api';

export const INIT_TODOS = 'INIT_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const SET_TODO_STATUS = 'SET_TODO_STATUS';

export function initTodosAction(todosData) {
  return {
    type: INIT_TODOS,
    "newData": todosData,
  }
}

export function addTodoAction ({id, userId, title, body}) {
  return {
    type: ADD_TODO,
    id, userId, title, body
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
