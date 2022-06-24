import { combineReducers } from 'redux'
import users from './users'
import posts from './posts'
import todos from './todos'
import filter from './filter'

export default combineReducers({
  users,
  posts,
  todos,
  filter,
})