import {getInitialData} from '../Utils/api'
import { initUsersAction } from "./users"
import {initPostsAction} from "./posts";
import {initTodosAction} from "./todos";

export function handleInitialData() {
    return (dispatch) => {
        // dispatch(showLoading())
        return getInitialData()
            .then((responseData) => {
                const {users, posts, todos} = responseData;
                Promise.resolve()
                    .then(() => {
                        return dispatch(initUsersAction(users));
                    })
                    .then(() => {
                        return dispatch(initPostsAction(posts));
                    })
                    .then(() => {
                        return dispatch(initTodosAction(todos));
                    })
                    .then(() => {
                        // To commit end of initialization.
                        return dispatch({type: 'INIT_COMMIT',})
                    })
            })
            .catch(error => {
                console.log('Failed to fetch data!');
                console.log(error);
            });
    }
}