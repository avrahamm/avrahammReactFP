import React, { Component } from 'react';
import {connect} from 'react-redux';
import './AddUser.css';

class AddUser extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            name:"",
            email:"",
            selectedUserId:0,
            internalStateChange:false,
            takenFromLocalStorage:false
        };
    }

    static getDerivedStateFromProps(nextProps,prevState)
    {
        let selectedUserId = nextProps.myCustomProps.selectedUserId;

        // State is changed from inside - not by props from parent.
        // Return prevState as is with the internalStateChange flag reset.
        if( prevState.internalStateChange){
            return { internalStateChange:false};
        }
        else {
            let updatedState = {
                selectedUserId: selectedUserId
            };
            if( !prevState.takenFromLocalStorage) {
                //TODO! use constants
                updatedState = {
                    name:localStorage[`addUser-name`],
                    email:localStorage[`addUser-email`],
                    selectedUserId: selectedUserId,
                    takenFromLocalStorage:true
                };
            }
            return updatedState;
        }
    }

    updateField = (e) =>
    {
        let inputName = e.target.name;
        let value = e.target.value;
        this.setState({[inputName]:value, internalStateChange: true});
        localStorage[`addUser-${inputName}`] = value;
    }

    render() {
        //console.log("AddUser render");
        let nameError = this.state.titleError ? "nameError" : "";
        let emailError = this.state.bodyError ? "emailError" : "";

        return(
            <div className={"AddUser"}>

                <div className="AddUserHeader">
                    <span className={"label"}>
                        <h4>Add New User</h4>
                    </span>

                </div>
                <div className="AddUserBody">
                    <div className={`rowDiv name ${nameError}`}>
                        <span className={"label"}> Name :</span>
                        <input type="text" name={"name"}
                               value={this.state.name}
                               onChange={this.updateField}
                        />
                    </div>

                    <div className={`rowDiv email ${emailError}`}>
                        <span className={"label"}> Email :</span>
                        <input type="text" name={"email"}
                               value={this.state.email}
                               onChange={this.updateField}
                        />
                    </div>

                    <div className={"rowDiv buttons"}>
                        <span>
                            <input type="button" className={"userButton  button"}
                                   onClick={() => this.props.cancel(this)}
                                   value={"Cancel"}
                            />
                        </span>
                        <span>
                            <input type="button" className={"userButton  button"}
                                   onClick={() => {
                                       this.props.addUser(
                                           this.state.name,
                                           this.state.email,
                                           this)
                                   }
                               }
                                   value={"Add"}
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        cancel: (obj) =>
        {
            goBack(obj);
        },
        addUser: (name,email,obj) =>
        {
            if( !name.length ) {
                alert("Name can not be empty!");
                obj.setState({titleError:true});
                return;
            }
            if( !email.length) {
                alert("Body can not be empty!");
                obj.setState({titleError:false,bodyError:true});
                return;
            }
            dispatch({ type: 'ADD_USER', name: name, email:email });
            // reset relevant local storage.
            localStorage[`addUser-name`] = "";
            localStorage[`addUser-email`] = "";
            goBack(obj);
        }
    }
}

/**
 * It depends if the was selectedUSerId.
 * @param obj
 */
const goBack = (obj) => {
    let selectedUSerId = obj.state.selectedUserId;
    if( selectedUSerId ) {
        obj.props.history.goBack();
    }
    else {
        obj.props.history.push(`/`);
    }
}

const mapStateToProps = (state) => {
    return {myCustomProps: state};
}

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUser));