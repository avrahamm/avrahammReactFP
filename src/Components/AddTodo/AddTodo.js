import React, { Component } from 'react';
import {connect} from 'react-redux';
import './AddTodo.css';

class AddTodo extends Component {

    constructor(props)
    {
        super(props);
        this.state ={
            userId:0,
            selectedUserId:0,
            title:"",
            internalStateChange:false
        };
    }

    static getDerivedStateFromProps(nextProps,prevState)
    {
        //START TODO! Think how to reuse this code instead copying.
        let userId = Number.parseInt(nextProps.match.params.userId);
        let selectedUserId = nextProps.myCustomProps.selectedUserId;
        //for direct loading, not by selecting user - wil be redirected.
        if( !selectedUserId || // 0 means no user was selected - direct navigation.
            (userId !== selectedUserId) // selected user deleted
        ) {
            nextProps.history.push('/');
        }
        // END
        // State is changed from inside - not by props from parent.
        // Return prevState as is with the internalStateChange flag reset.
        if( prevState.internalStateChange){
            return { internalStateChange:false};
        }
        else {
            return {
                userId: nextProps.match.params.userId,
                selectedUserId: selectedUserId
            };
        }
    }

    updateField = (e) =>
    {
        let inputName = e.target.name;
        let value = e.target.value;
        this.setState({[inputName]:value, internalStateChange: true});
    }

    render() {
        //console.log("UserComp render userId = " + this.state.userId);
        let titleError = this.state.titleError ? "titleError" : "";
        return(
            <div className={"AddTodo"}>

                <div className="AddTodoHeader">
                    <span className={"label"}>
                        <h4>Add New Todo - User {this.state.userId}</h4>
                    </span>

                </div>
                <div className="AddTodoBody">
                    <div className={`rowDiv title ${titleError}`}>
                        <span className={"label"}> Title :</span>
                        <input type="text" name={"title"}
                               value={this.state.title}
                               onChange={this.updateField}
                        />
                    </div>

                    <div className={"rowDiv buttons"}>
                        <span>
                            <input type="button" className={"userButton  button"}
                                   onClick={() => this.props.cancel(this.state.userId,this)}
                                   value={"Cancel"}
                            />
                        </span>
                        <span>
                            <input type="button" className={"userButton  button"}
                                   onClick={() => this.props.addTodo(this.state.userId, this.state.title,this)}
                                   value={"Add"}
                            />
                        </span>
                    </div>
                </div>
            </div>
        );

    }
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        cancel: (userId,obj) =>
        {
            // obj.props.history.goBack();
            obj.props.history.push(`/user/${userId}`);
        },
        addTodo: (userId,title,obj) =>
        {
            if( !title.length) {
                alert("Title can not be empty!");
                obj.setState({titleError:true,internalStateChange: true});
                return;
            }
            dispatch({ type: 'ADD_TODO',userId:userId, title: title });
            obj.props.history.push(`/user/${userId}`);
        }
    }
}

const mapStateToProps = (state) => {
    return {myCustomProps: state};
}

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodo));
