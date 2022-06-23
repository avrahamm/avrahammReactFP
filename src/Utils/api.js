import {getUsers, getPosts, getTodos} from "./JSonpDAL";

export function getInitialData () {
    return Promise.all([
        getUsers(),
        getPosts(),
        getTodos()
    ]);
}