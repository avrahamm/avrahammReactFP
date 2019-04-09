import React, { Component } from 'react';
import {connect} from 'react-redux';
import './TodoComp.css';

class TodoComp extends Component {

    constructor(props)
    {
        super(props);
        this.state ={
            todo:{},
            internalStateChange: false
        };
    }

    static getDerivedStateFromProps(nextProps,prevState)
    {
        // State is changed from inside - not by props from parent.
        // Return prevState as is with the internalStateChange flag reset.
        if( prevState.internalStateChange){
            return { internalStateChange:false};
        }
        else {
            // from parent props update.
            return {
                todo:nextProps.todo
            };
        }
    }

    markCompleted = () =>
    {
        // state update forces re-rendering.
        this.setState({internalStateChange: true});
        this.props.setTodoStatus(this.state.todo.userId, this.state.todo.id,true);
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        //console.log("TodoComp render userId = " + this.state.todo.userId + " todo Id = " + this.state.todo.id );

        let markCompletedButton = "";
        if( !this.state.todo.completed ) {
            markCompletedButton = <span className={"markCompletedButtonSpan"}>
                <input type="button" className={"markCompletedButton button"}
                                         onClick={this.markCompleted}
                                         value={"Mark Completed"}/></span>;
        }

        return(
            <div className={"TodoComp"}>
                <div className={"rowDiv"}>
                    <span className={"label"}> Title :</span>
                    <span className={"content"}>{this.state.todo.title}</span>
                </div>

                <div className={"rowDiv"}>
                    <span className={"label"}> Completed :</span>
                    <span className={"content"}>{this.capitalizeFirstLetter(this.state.todo.completed.toString())}</span>
                    {markCompletedButton}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching mark todoItem as completed
        setTodoStatus: (userId, todoId,status) =>
        {
            dispatch({ type: 'SET_TODO_STATUS',userId:userId, todoId:todoId,completedValue:status })
        },
    }
}

export default (connect(
    null,
    mapDispatchToProps
)(TodoComp));
