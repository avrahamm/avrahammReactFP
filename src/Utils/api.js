import {
    getUsers, getPosts, getTodos,
    _createUser,
    _deleteUser
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

export function createPost({userId, title, body}) {
    return _createPost({userId, title, body});
}
