import {
    _getUsers,
    _createUser, _deleteUser, _updateUser,
    _getUserPosts,_createPost,
    _getUserTodos,_createTodo, _setTodoStatus,
} from "./JSonpDAL";

import {convertArrayToObject} from "./CommonUtils";

export function getInitialData () {
    return _getUsers()
    .then(usersArray => ({
        users: convertArrayToObject(usersArray),
    }))
    ;
}

export function createUser({name,email}) {
    return _createUser({name,email});
}

export function updateUser(updatedUserData) {
    return _updateUser(updatedUserData);
}

export function deleteUser(userId) {
    return _deleteUser(userId);
}

export function getUserPosts(userId) {
    return _getUserPosts(userId)
        .then(usersPosts => convertArrayToObject(usersPosts))
        ;
}

export function createPost({userId, title, body}) {
    return _createPost({userId, title, body});
}

export function getUserTodos(userId) {
    return _getUserTodos(userId)
        .then(usersTodos => convertArrayToObject(usersTodos))
        ;
}

export function createTodo({userId, title}) {
    return _createTodo({userId, title});
}

export function setTodoStatus({userId, todoId, completedValue}) {
    return _setTodoStatus({userId, todoId, completedValue});
}
