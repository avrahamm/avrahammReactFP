import {getInitialData} from '../Utils/api'
import { initUsersAction } from "./users"
import {initPostsAction} from "./posts";
import {initTodosAction} from "./todos";

export function handleInitialData() {
    return (dispatch) => {
        // dispatch(showLoading())
        return getInitialData()
            .then((responseData) => {
                const [usersData, postsData, todosData] = responseData;
                console.log(usersData, postsData, todosData);
                Promise.resolve()
                    .then(() => {
                        return dispatch(initUsersAction (usersData));
                    })
                    .then(() => {
                        return dispatch(initPostsAction(postsData));
                    })
                    .then(() => {
                        return dispatch(initTodosAction(todosData));
                    })
                    .then(() => {
                        // To commit end of initialization.
                        return dispatch({type: 'INIT_COMMIT',})
                    })
            })
            .catch(error => {
                console.log('Failed to fetch data!');
            });
    }
}