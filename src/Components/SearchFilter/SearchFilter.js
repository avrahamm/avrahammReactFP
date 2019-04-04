import React, { Component } from 'react';
import {connect} from 'react-redux';
import './SearchFilter.css';
import {Link} from "react-router-dom";

/**
 * To filter users by name or email.
 */
class SearchFilter extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            searchString:""
        }
    }

    updateField = (e) =>
    {
        let inputName = e.target.name;
        let value = e.target.value;
        this.setState({[inputName]:value});
    };

    render() {
        //console.log("SearchFilter render");

        return(
            <div className={"SearchFilter"}>
                <div className={"rowDiv"}>
                    <span className={"label"}> Search :</span>
                    <input type="text" name={"searchString"}
                           placeholder={"Name or email"}
                           value={this.state.searchString}
                           onChange={(e) => {
                               this.updateField(e);
                               this.props.setSearchString(e.target.value.toLowerCase())
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
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        setSearchString: (searchString) =>
        {
            dispatch({ type: 'SET_SEARCH_STRING', searchString: searchString});
        }
    }
}

export default (connect(
    null,
    mapDispatchToProps
)(SearchFilter));