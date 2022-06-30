import {
    _getUsers,
    _createUser, _deleteUser, _updateUser,
    _getUserItems,
    _createPost,
    _createTodo, _setTodoStatus,
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

export function getUserItems(userId, itemName) {
    return _getUserItems(userId, itemName)
        .then(items => convertArrayToObject(items))
        ;
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
