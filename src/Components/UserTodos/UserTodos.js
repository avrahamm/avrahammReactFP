import * as React from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory, useParams, useRouteMatch} from 'react-router-dom';

import TodoComp from '../TodoComp/TodoComp';
import './UserTodos.css';

export default function UserTodos() {
    const history = useHistory();
    const match = useRouteMatch();
    let {userId} = useParams();
    userId = Number.parseInt(userId);

    const selectedUserId = useSelector(state => state.selectedUserId);
    //for direct loading, not by selecting user - wil be redirected.
    if (!selectedUserId || // 0 means no user was selected - direct navigation.
        (userId !== selectedUserId) // selected user deleted
    ) {
        history.push('/');
    }

    const userTodos = useSelector(state => state.todos[userId]);

    //console.log("UserTodos render");
    let userTodosArray = userTodos.map((todo, index) => {
            return <TodoComp key={index} todo={todo}/>;
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
