import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory, useParams, useRouteMatch} from 'react-router-dom';

import PostComp from '../PostComp/PostComp';
import './UserPosts.css';
import {getUserPosts} from "../../Utils/api";
import {convertObjectToItemsArray} from "../../Utils/CommonUtils";
import {initSelectedUserPostsAction} from "../../actions/posts";

export default function UserPosts() {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    let {userId} = useParams();
    userId = Number.parseInt(userId);
    const selectedUserId = useSelector(state =>
        state.users.selectedUserId);

    const postsWereInitialized = useSelector(state =>
        state.posts.initialized);

    const userPosts = useSelector(state =>
        convertObjectToItemsArray(state.posts.posts)
    );
    React.useEffect( () => {
        if (postsWereInitialized) {
            return;
        }
        getUserPosts(userId)
            .then(curUserPosts =>
                dispatch(initSelectedUserPostsAction(curUserPosts))
            );
        return function unmount(){
            console.log('UserPosts React.useEffect unmount');
        }
    },[userId, postsWereInitialized, dispatch]);
    //for direct loading, not by selecting user - wil be redirected.
    if (!selectedUserId || // 0 means no user was selected - direct navigation.
        (userId !== selectedUserId) // selected user deleted
    ) {
        history.push('/');
    }

    //console.log("UserTodos render");
    const userPostsArray = userPosts
        .map((post) => {
            return <PostComp key={post.id} post={post}/>;
        }
    );

    return (
        <div className="UserPosts">
            <div className="UserPostsHeader">
                <span className={"label"}>
                    <h4>Posts - User {userId}</h4>
                </span>
                <span className={"addPostButton"}>
                    <Link to={`${match.url}/addPost`}>
                        <input className={"button"} type="button" value={"Add"}/>
                    </Link>
                </span>
            </div>

            <div className="UserPostsBody">
                {userPostsArray}
            </div>
        </div>
    );
}
