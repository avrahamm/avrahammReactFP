import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import './AddTodo.css';
import {handleAddTodoThunk} from "../../actions/todos";

export default function AddTodo() {
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
    const [titleError, setTitleError] = React.useState("");

    function addTodo(userId,title)
    {
        if (!title.length) {
            alert("Title can not be empty!");
            setTitleError("titleError");
            return;
        }
        dispatch(handleAddTodoThunk(userId, title));
        history.push(`/user/${userId}`);
    }


    return(
        <div className={"AddTodo"}>

            <div className="AddTodoHeader">
                <span className={"label"}>
                    <h4>Add New Todo - User {userId}</h4>
                </span>

            </div>
            <div className="AddTodoBody">
                <div className={`rowDiv title ${titleError}`}>
                    <span className={"label"}> Title :</span>
                    <input type="text" name={"title"}
                           value={title}
                           onChange={e => setTitle(e.target.value)}
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
                               onClick={(e) => addTodo(userId, title)}
                               value={"Add"}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}
