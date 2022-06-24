import {
    _getUsers, _getPosts, _getTodos,
    _createUser, _deleteUser,  _updateUser,
    _createPost,
    _createTodo, _setTodoStatus,
} from "./JSonpDAL";

import {convertArrayToObject} from "./CommonUtils";

export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getPosts(),
        _getTodos()
    ])
    .then(([usersArray, postsArray, todosArray]) => ({
        users: convertArrayToObject(usersArray),
        posts: convertArrayToObject(postsArray),
        todos: convertArrayToObject(todosArray),
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

export function createPost({userId, title, body}) {
    return _createPost({userId, title, body});
}

export function createTodo({userId, title}) {
    return _createTodo({userId, title});
}

export function setTodoStatus({userId, todoId, completedValue}) {
    return _setTodoStatus({userId, todoId, completedValue});
}
