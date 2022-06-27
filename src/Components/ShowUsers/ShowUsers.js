import * as React from 'react';
import {useSelector} from 'react-redux';
import UserComp from '../UserComp/UserComp';
import './ShowUsers.css';
import {convertObjectToItemsArray} from "../../Utils/CommonUtils";

/**
 * Container connected to redux to pull, hold and render Users list.
 */
export default function ShowUsers() {
    const users = useSelector(state =>
        convertObjectToItemsArray(state.users.users));
    const selectedUserId = useSelector(state => state.users.selectedUserId);
    const searchString = useSelector(state => state.filter.searchString);

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
        let userData = {
            userId: userId,
            name: user.name,
            email: user.email,
            street: user.address.street,
            city: user.address.city,
            zipcode: user.address.zipcode,
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
