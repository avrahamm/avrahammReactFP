import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory, useParams, useRouteMatch} from 'react-router-dom';

import TodoComp from '../TodoComp/TodoComp';
import './UserTodos.css';
import {getUserTodos} from "../../Utils/api";
import {convertObjectToItemsArray} from "../../Utils/CommonUtils";
import {setSelectedUserTodosAction} from "../../actions/todos";

export default function UserTodos() {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    let {userId} = useParams();
    userId = Number.parseInt(userId);
    const selectedUserId = useSelector(state => state.users.selectedUserId);

    const userTodos = useSelector( state =>
        convertObjectToItemsArray(state.todos.todos)
    );
    React.useEffect( () => {
        if(!selectedUserId) {
            return;
        }
        if (userTodos.length) {
            return;
        }
        getUserTodos(selectedUserId)
            .then(curUserTodos => {
                    console.log('UserTodos useEffect');
                    console.log(curUserTodos);
                    console.log('selectedUserId = ');
                    console.log(selectedUserId);
                    dispatch(setSelectedUserTodosAction(curUserTodos))
                }
            );
    },[selectedUserId,userTodos,dispatch]);
    //for direct loading, not by selecting user - wil be redirected.
    if (!selectedUserId || // 0 means no user was selected - direct navigation.
        (userId !== selectedUserId) // selected user deleted
    ) {
        history.push('/');
    }
    //console.log("UserTodos render");
    const userTodosArray = userTodos
        .map((todo) => {
            return <TodoComp key={todo.id} todo={todo} />;
        }
    );

    return (
        <div className="UserTodos">
            <div className="UserTodosHeader">
                <span className={"label"}>
                    <h4>Todos - User {userId}</h4>
                </span>

                <span className={"addTodoButton"}>
                    <Link to={`${match.url}/addTodo`}>
                        <input className={"button"} type="button" value={"Add"}/>
                    </Link>
                </span>
            </div>

            <div className="UserTodosBody">
                {userTodosArray}
            </div>
        </div>
    );
}
