import {createUser, deleteUser, updateUser} from '../Utils/api'
// import { showLoading, hideLoading } from 'react-redux-loading'

export const INIT_USERS = 'INIT_USERS'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'
export const ADD_USER = 'ADD_USER'
export const SELECT_USER = 'SELECT_USER'

export function initUsersAction(usersData) {
  return {
    type: INIT_USERS,
    "newData": usersData,
  }
}

export function updateUserAction(updatedUserData) {
  return {
    type: UPDATE_USER,
    updatedUserData,
  }
}

export function deleteUserAction(userId) {
  return {
    type: DELETE_USER,
    userId,
  }
}

export function addUserAction({id, name, email}) {
  return {
    type: ADD_USER,
    id,
    name,
    email,
  }
}

export function selectUserAction (userId) {
  return {
    type: SELECT_USER,
    userId,
  }
}

export function handleUpdateUserThunk(updatedUserData) {
  return (dispatch) => {
    return updateUser(updatedUserData)
        .then((updatedUser) => dispatch(updateUserAction(updatedUser)))
  }
}

export function handleDeleteUserThunk(userId) {
  return (dispatch) => {
    return deleteUser(userId)
        .then((status) =>  status ?
            dispatch(deleteUserAction(userId)) : () => {}
        )
  }
}

export function handleAddUserThunk (name, email) {
  return (dispatch) => {
    return createUser({
      name,
      email
    })
    .then((newUser) => dispatch(addUserAction(newUser)))
  }
}
