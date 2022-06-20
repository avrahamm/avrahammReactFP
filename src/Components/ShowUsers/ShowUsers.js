import * as React from 'react';
import {useSelector} from 'react-redux';
import UserComp from '../UserComp/UserComp';
import './ShowUsers.css';
import {filterFromUndefined} from "../../Utils/CommonUtils";

/**
 * Container connected to redux to pull, hold and render Users list.
 */
export default function ShowUsers() {
    const users = useSelector(state => filterFromUndefined(state.users));
    const todos = useSelector(state => state.todos);
    const selectedUserId = useSelector(state => state.selectedUserId);
    const searchString = useSelector(state => state.searchString);

    //console.log("ShowUsers Render()");
    let filteredUsers = users;
    let filterString = searchString;

    if (filterString !== "") {
        filteredUsers = filteredUsers.filter(function (user) {
            return (
                user.name.toLowerCase().includes(filterString) ||
                user.email.toLowerCase().includes(filterString)
            )
        });
    }

    let userComps = filteredUsers.map((user) => {
        let userId = user.id;
        let userTasksStatus = "completedTasks";
        if (Array.isArray(todos[userId])) {
            let allTasksCompleted = todos[userId].every(function (todo) {
                return (todo.completed === true);
            });
            userTasksStatus = (allTasksCompleted === true) ? "completedTasks" : "uncompletedTasks";
        }

        let userData = {
            userId: userId,
            name: user.name,
            email: user.email,
            street: user.address.street,
            city: user.address.city,
            zipcode: user.address.zipcode,
            tasksStatus: userTasksStatus,
            selectedUserId: selectedUserId
        };
        return <UserComp key={userId}
                         userData={userData}/>
    });

    return (
        <div className="ShowUsers">
            {userComps}
        </div>
    );
}
