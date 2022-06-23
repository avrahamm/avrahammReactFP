import {getInitialData} from '../Utils/api'

export function handleInitialData() {
    return (dispatch) => {
        // dispatch(showLoading())
        return getInitialData()
            .then((responseData) => {
                const [usersDataObj, postsDataObj, todosDataObj] = responseData;
                const [usersData, postsData, todosData] = [usersDataObj.data, postsDataObj.data, todosDataObj.data];
                console.log(usersData, postsData, todosData);
                Promise.resolve()
                    .then(() => {
                        return dispatch({type: 'INIT_USERS', 'newData': usersData});
                    })
                    .then(() => {
                        return dispatch({type: 'INIT_POSTS', 'newData': postsData});
                    })
                    .then(() => {
                        return dispatch({type: 'INIT_TODOS', 'newData': todosData});
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