import React from 'react';
import {useDispatch} from 'react-redux';
import './TodoComp.css';
import {handleSetTodoStatusThunk} from "../../actions/todos";

export default function TodoComp({todo}) {
    //console.log("TodoComp render userId = " + todo.userId + " todo Id = " + todo.id );
    const dispatch = useDispatch();

    function setTodoStatus(userId, todoId, status) {
        dispatch(handleSetTodoStatusThunk(userId, todoId, status));
    }

    function markCompleted(e) {
        setTodoStatus(todo.userId, todo.id, true);
    }

    let markCompletedButton = "";
    if (!todo.completed) {
        markCompletedButton = <span className={"markCompletedButtonSpan"}>
                <input type="button" className={"markCompletedButton button"}
                       onClick={markCompleted}
                       value={"Mark Completed"}/></span>;
    }

    return (
        <div className={"TodoComp"}>
            <div className={"rowDiv"}>
                <span className={"label"}> Title :</span>
                <span className={"content"}>{todo.title}</span>
            </div>

            <div className={"rowDiv"}>
                <span className={"label"}> Completed :</span>
                <span className={"content"}>{capitalizeFirstLetter(todo.completed.toString())}</span>
                {markCompletedButton}
            </div>
        </div>
    );
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
