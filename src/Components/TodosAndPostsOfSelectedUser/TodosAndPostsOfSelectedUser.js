import React from 'react';
import {Switch,Route} from 'react-router-dom' ;

import './TodosAndPostsOfSelectedUser.css';
import UserTodos from '../UserTodos/UserTodos';
import UserPosts from '../UserPosts/UserPosts';
import AddTodo from '../AddTodo/AddTodo';
import AddPost from "../AddPost/AddPost";

/**
 * Root Point of routing at the right side of page.
 */
export default function TodosAndPostsOfSelectedUser() {
    return (
        <div className={"TodosAndPosts"}>
            <div className={"fluid-container"}>
                <Switch>
                    <Route path={"/user/:userId/addTodo"} component={AddTodo}/>
                    <Route path={"/user/:userId"} component={UserTodos}/>
                </Switch>
                <Switch>
                    <Route path={"/user/:userId/addPost"} component={AddPost}/>
                    <Route path={"/user/:userId"} component={UserPosts}/>
                </Switch>
            </div>
        </div>
    );
}
