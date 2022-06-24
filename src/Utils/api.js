import {
    getUsers, getPosts, getTodos,
    _createUser,
    _deleteUser, _setTodoStatus, _updateUser, _createTodo
} from "./JSonpDAL";

export function getInitialData () {
    return Promise.all([
        getUsers(),
        getPosts(),
        getTodos()
    ]);
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

export function createTodo({userId, title}) {
    return _createTodo({userId, title});
}

export function setTodoStatus({userId, todoId, completedValue}) {
    return _setTodoStatus({userId, todoId, completedValue});
}
