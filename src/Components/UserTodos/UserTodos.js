import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

import TodoComp from '../TodoComp/TodoComp';
import './UserTodos.css';
import {useFetchUserItems} from "../../hooks/useFetchUserItems";

export default function UserTodos() {
    const history = useHistory();
    const [userId,selectedUserId, match, userTodos] = useFetchUserItems('todos');

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
