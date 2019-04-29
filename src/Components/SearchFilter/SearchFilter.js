import React from 'react';
import {connect} from 'react-redux';
import './SearchFilter.css';
import {Link} from "react-router-dom";

/**
 * To filter users by name or email.
 */
let SearchFilter = (props) => {
    //console.log("SearchFilter render");

    return (
        <div className={"SearchFilter"}>
            <div className={"rowDiv"}>
                <span className={"label"}> Search :</span>
                <input type="text" name={"searchString"}
                   placeholder={"Name or email"}
                   onChange={(e) => {
                       props.setSearchString(e.target.value.toLowerCase())
                     }
                   }
                />
                <span className={"addUserSpan"}>
                    <Link to={`/addUser`}>
                        <input className={"button"} type="button" value={"Add"}/>
                    </Link>
                </span>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        setSearchString: (searchString) => {
            dispatch({type: 'SET_SEARCH_STRING', searchString: searchString});
        }
    }
}

export default (connect(
    null,
    mapDispatchToProps
)(SearchFilter));
