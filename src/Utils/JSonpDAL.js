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

export async function _createUser({name,email}) {
    // faking
    const id = Math.random()*10000;
    return {
        id,
        name,
        email
    };
}

export async function _updateUser(updatedUserData) {
    // faking
    return updatedUserData;
}

export async function _deleteUser(userId) {
    // faking
    return Math.random()*10 > 7;
}
