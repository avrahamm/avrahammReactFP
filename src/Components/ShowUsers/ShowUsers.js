import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserComp from '../UserComp/UserComp';
import './ShowUsers.css';
import {filterFromUndefined} from "../../Utils/CommonUtils";

/**
 * Container connected to redux to pull, hold and render Users list.
 */
class ShowUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            todos: [],
            searchString:"",
            selectedUserId:0
        }
    }

    static getDerivedStateFromProps(nextProps,prevState) {
        return {
            users: filterFromUndefined(nextProps.myCustomProps.users),
            todos: nextProps.myCustomProps.todos,
            selectedUserId: nextProps.myCustomProps.selectedUserId,
            searchString: nextProps.myCustomProps.searchString
        }
    }

    setSearchString = (e) =>
    {
        // case insensitive.
        this.setState({searchString : e.target.value.toLowerCase()});
    }

    render() {
        //console.log("ShowUsers Render()");
        let userComps = [];
        // let todos = this.state.todos;
        let filteredUsers = this.state.users;
        let filterString = this.state.searchString;

        if( filterString !== "" ) {
            filteredUsers = filteredUsers.filter(function (user) {
                return (
                    user.name.toLowerCase().includes(filterString) ||
                    user.email.toLowerCase().includes(filterString)
                )
            });
        }

        userComps = filteredUsers.map((user, index) => {
            let userId = user.id;
            let todos = this.state.todos;
            let userTasksStatus = "completedTasks";
            if (Array.isArray(todos[userId])) {
                let allTasksCompleted = todos[userId].every(function (todo) {
                    return (todo.completed === true);
                });
                userTasksStatus = (allTasksCompleted === true) ? "completedTasks" : "uncompletedTasks";
            }

            let userData = {
                userId:userId,
                name:user.name,
                email:user.email,
                street:user.address.street,
                city:user.address.city,
                zipcode:user.address.zipcode,
                tasksStatus:userTasksStatus,
                selectedUserId:this.state.selectedUserId
            };
            return <UserComp key={index}
                             userData = {userData} />
        },this);

        return (
            <div className="ShowUsers">
                {userComps}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {myCustomProps: state};
}

export default connect(mapStateToProps)(ShowUsers);