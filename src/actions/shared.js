import {getInitialData} from '../Utils/api'
import { initUsersAction } from "./users"

export function handleInitialData() {
    return (dispatch) => {
        // dispatch(showLoading())
        return getInitialData()
            .then(({users}) => {
                return dispatch(initUsersAction(users));
            })
            .catch(error => {
                console.log('Failed to fetch initial data!');
                console.log(error);
            });
    }
}