import {createPost} from '../Utils/api';

export const INIT_SELECTED_USER_POSTS = 'INIT_SELECTED_USER_POSTS';
export const INIT_POSTS = 'INIT_POSTS'
export const ADD_POST = 'ADD_POST'

export function addPostAction ({id, userId, title, body}) {
  return {
    type: ADD_POST,
    id, userId, title, body
  }
}

export function handleAddPostThunk(userId, title, body) {
  return (dispatch) => {
    return createPost({userId, title, body})
        .then((newPost) => dispatch(addPostAction(newPost)))
  }
}
