import React from 'react';
import {useDispatch} from 'react-redux';
import './SearchFilter.css';
import {Link} from "react-router-dom";
import {SET_SEARCH_STRING} from "../../actions/filter";

/**
 * To filter users by name or email.
 */
export default function SearchFilter(props) {
    //console.log("SearchFilter render");
    const dispatch = useDispatch();

    function setSearchString(searchString) {
        dispatch({type: SET_SEARCH_STRING, searchString: searchString});
    }

    return (
        <div className={"SearchFilter"}>
            <div className={"rowDiv"}>
                <span className={"label"}> Search :</span>
                <input type="text" name={"searchString"}
                   placeholder={"Name or email"}
                   onChange={(e) => {
                       setSearchString(e.target.value.toLowerCase())
                     }
                   }
                />
                {/*TODO! Probably extract Add user button to another component*/}
                <span className={"addUserSpan"}>
                    <Link to={`/addUser`}>
                        <input className={"button"} type="button" value={"Add"}/>
                    </Link>
                </span>
            </div>
        </div>
    );
}
