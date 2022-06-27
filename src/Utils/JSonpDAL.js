import {getData} from './DALUtils';
/**
 * To get data from the web and send to redux store.
 */
const apiBaseUrl = 'https://jsonplaceholder.typicode.com';

export function _getUsers() {
    return getData(`${apiBaseUrl}/users`);
}

export async function _createUser({name,email}) {
    // faking
    const id = Math.floor(Math.random()*10000);
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
    // return Math.random()*10 > 7;
    return true;
}

export async function _getUserPosts(userId) {
    return getData(`${apiBaseUrl}/posts?userId=${userId}`);
}

export async function _createPost({userId, title, body}) {
    // faking
    const id = Math.floor(Math.random()*10000);
    return {
        id,
        userId, title, body
    };
}

export async function _getUserTodos(userId) {
    return getData(`${apiBaseUrl}/todos?userId=${userId}`);
}

export async function _createTodo({userId, title}) {
    // faking
    const id = Math.floor(Math.random()*10000);
    return {
        id,
        userId, title
    };
}

export async function _setTodoStatus({userId, todoId, completedValue}) {
    // faking
    return {userId, todoId, completedValue} ;
}

