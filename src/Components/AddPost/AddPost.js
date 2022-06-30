import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import './AddPost.css';
import {handleAddPostThunk} from "../../actions/posts";

export default function AddPost() {
    const dispatch = useDispatch();
    const history = useHistory();
    let {userId} = useParams();
    userId = Number.parseInt(userId);

    const selectedUserId = useSelector(state => state.users.selectedUserId);
    //for direct loading, not by selecting user - wil be redirected.
    if (!selectedUserId || // 0 means no user was selected - direct navigation.
        (userId !== selectedUserId) // selected user deleted
    ) {
        history.push('/');
    }

    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [titleError, setTitleError] = React.useState("");
    const [bodyError, setBodyError] = React.useState("");

    function addPost(userId, title, body) {
        if (!title.length) {
            alert("Title can not be empty!");
            setTitleError("titleError");
            return;
        }
        if (!body.length) {
            alert("Body can not be empty!");
            setBodyError("bodyError");
            return;
        }
        dispatch(handleAddPostThunk(userId, title, body));
        // redirect causes new mount of UserPosts
        history.push(`/user/${userId}`);
    }

    return (
        <div className={"AddPost"}>

            <div className="AddPostHeader">
                    <span className={"label"}>
                        <h4>Add New Post - User {userId}</h4>
                    </span>
            </div>
            <div className="AddPostBody">
                <div className={`rowDiv title ${titleError}`}>
                    <span className={"label"}> Title :</span>
                    <input type="text" name={"title"}
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className={`rowDiv body ${bodyError}`}>
                    <span className={"label"}> Body :</span>
                    <input type="text" name={"body"}
                           value={body}
                           onChange={e => setBody(e.target.value)}
                    />
                </div>

                <div className={"rowDiv buttons"}>
                    <span>
                        <input type="button" className={"userButton  button"}
                               onClick={(e) => history.push(`/user/${userId}`)}
                               value={"Cancel"}
                        />
                    </span>
                    <span>
                        <input type="button" className={"userButton  button"}
                               onClick={(e) => addPost(userId, title, body)}

                               value={"Add"}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}
