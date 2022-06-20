import * as React from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory, useParams, useRouteMatch} from 'react-router-dom';

import PostComp from '../PostComp/PostComp';
import './UserPosts.css';

export default function UserPosts() {
    const history = useHistory();
    const match = useRouteMatch();
    let {userId} = useParams();
    userId = Number.parseInt(userId);

    const selectedUserId = useSelector(state => state.selectedUserId);
    //for direct loading, not by selecting user - wil be redirected.
    if (!selectedUserId || // 0 means no user was selected - direct navigation.
        (userId !== selectedUserId) // selected user deleted
    ) {
        history.push('/');
    }

    const userPosts = useSelector(state => state.posts[userId]);

    //console.log("UserTodos render");
    let userPostsArray = userPosts.map((post, index) => {
            return <PostComp key={index} post={post}/>;
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
