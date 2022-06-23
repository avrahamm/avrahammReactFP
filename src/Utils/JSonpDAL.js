import {getData} from './DALUtils';
/**
 * To get data from the web and send to redux store.
 */

export function getUsers() {
    return getData('https://jsonplaceholder.typicode.com/users');
}

export function getPosts() {
    return getData('https://jsonplaceholder.typicode.com/posts');
}

export function getTodos() {
    return getData('https://jsonplaceholder.typicode.com/todos');
}