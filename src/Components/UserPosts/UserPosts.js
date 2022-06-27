import * as React from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory, useParams, useRouteMatch} from 'react-router-dom';

import PostComp from '../PostComp/PostComp';
import './UserPosts.css';
import {getUserPosts} from "../../Utils/api";

export default function UserPosts() {
    const history = useHistory();
    const match = useRouteMatch();
    let {userId} = useParams();
    userId = Number.parseInt(userId);
    const selectedUserId = useSelector(state =>
        state.users.selectedUserId);
    const [userPosts, setUserPosts] = React.useState([]);
    React.useEffect( () => {
        if(!selectedUserId) {
            return;
        }
        getUserPosts(selectedUserId)
            .then(curUserTodos => setUserPosts(curUserTodos));
    },[selectedUserId])
    //for direct loading, not by selecting user - wil be redirected.
    if (!selectedUserId || // 0 means no user was selected - direct navigation.
        (userId !== selectedUserId) // selected user deleted
    ) {
        history.push('/');
    }

    //console.log("UserTodos render");
    const userPostsArray = userPosts.map((post) => {
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
