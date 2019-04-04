import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom' ;
import TodoComp from '../TodoComp/TodoComp';
import './UserTodos.css';

class UserTodos extends Component {
    constructor(props)
    {
        super(props);
        this.state= {userId:0, userTodos:[] };
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        let userId = Number.parseInt(nextProps.match.params.userId);
        let selectedUserId = nextProps.myCustomProps.selectedUserId;
        //for direct loading not by selecting user - wil be redirected.
        if( !selectedUserId || // 0 means no user was selected
            (userId !== selectedUserId) //
        ) {
            nextProps.history.push('/');
        }
        let userTodos = [];
        if ( (nextProps.myCustomProps.todos.length) &&
            Array.isArray(nextProps.myCustomProps.todos[userId]))
        {
            userTodos = nextProps.myCustomProps.todos[userId];
        }
        return {
                userId: userId,
                userTodos: userTodos,
            };
    }

    render() {

        //console.log("UserTodos render");
        let userTodosArray = this.state.userTodos.map( (todo, index) =>
            {
                return <TodoComp key={index} todo={todo} />;
            }
        );
        return (
            <div className="UserTodos">
                <div className="UserTodosHeader">
                    <span className={"label"}>
                        <h4>Todos - User {this.state.userId}</h4>
                    </span>

                    <span className={"addTodoButton"}>
                        <Link to={`${this.props.match.url}/addTodo`}>
                            <input className={"button"}  type="button" value={"Add"} />
                        </Link>
                    </span>

                </div>

                <div className="UserTodosBody">
                {userTodosArray}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {myCustomProps: state};
}

export default connect(mapStateToProps)(UserTodos);
