import React from 'react';
import {connect} from 'react-redux';
import './TodoComp.css';

let TodoComp = (props) => {
    //console.log("TodoComp render userId = " + props.todo.userId + " todo Id = " + props.todo.id );

    let markCompletedButton = "";
    if (!props.todo.completed) {
        markCompletedButton = <span className={"markCompletedButtonSpan"}>
                <input type="button" className={"markCompletedButton button"}
                       onClick={markCompleted.bind(null, props)}
                       value={"Mark Completed"}/></span>;
    }

    return (
        <div className={"TodoComp"}>
            <div className={"rowDiv"}>
                <span className={"label"}> Title :</span>
                <span className={"content"}>{props.todo.title}</span>
            </div>

            <div className={"rowDiv"}>
                <span className={"label"}> Completed :</span>
                <span className={"content"}>{capitalizeFirstLetter(props.todo.completed.toString())}</span>
                {markCompletedButton}
            </div>
        </div>
    );
}

/**
 * @link:https://stackoverflow.com/questions/46138145/functions-in-stateless-components
 * @param props
 */
const markCompleted = (props) => {
    props.setTodoStatus(props.todo.userId, props.todo.id, true);
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching mark todoItem as completed
        setTodoStatus: (userId, todoId, status) => {
            dispatch({type: 'SET_TODO_STATUS', userId: userId, todoId: todoId, completedValue: status})
        },
    }
}

export default (connect(
    null,
    mapDispatchToProps
)(TodoComp));
