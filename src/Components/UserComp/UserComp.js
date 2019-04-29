import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom' ;
import './UserComp.css';

class UserComp extends Component {

    constructor(props)
    {
        super(props);
        this.state ={
            userId:0,
            name:"",
            email:"",
            otherDataVisible: false,
            street:"",
            city:"",
            zipcode:"",
            tasksStatus:"completedTasks", // TODO! probably should stay in props
            internalStateChange: false,
            selectedUserId:0
        };
    }

    static getDerivedStateFromProps(nextProps,prevState)
    {
        // State is changed from inside - not by props from parent.
        // Return prevState as is with the internalStateChange flag reset.
        if( prevState.internalStateChange){
            return { internalStateChange:false};
        }
        else {
            return {
                userId: nextProps.userData.userId,
                name: nextProps.userData.name,
                email: nextProps.userData.email,
                street: nextProps.userData.street,
                city: nextProps.userData.city,
                zipcode: nextProps.userData.zipcode,
                tasksStatus: nextProps.userData.tasksStatus,
                selectedUserId: nextProps.userData.selectedUserId
            };
        }
    }

    showOtherData = ( ) =>
    {
       if( !this.state.otherDataVisible) {
           //console.log("showOtherData");
           this.setState({otherDataVisible: true, internalStateChange: true});
       }
    }

    hideShowData  = ( ) =>
    {
        if( this.state.otherDataVisible) {
            //console.log("hideShowData");
            this.setState(curState =>
            {
                return {otherDataVisible: false, internalStateChange: true}
            });
        }
    }

    updateField = (e) =>
    {
        let inputName = e.target.name;
        let value = e.target.value;
        this.setState({[inputName]:value, internalStateChange: true});
    }

    //@link:https://www.jstips.co/en/javascript/picking-and-rejecting-object-properties/
    pickUpdatedKeysFromObject = (obj, keys) =>
    {
        return keys.map(k => k in obj ? {[k]: obj[k]} : {})
            .reduce((res, o) => Object.assign(res, o), {});
    }

    render() {
        //console.log("UserComp render userId = " + this.state.userId);
        let taskStatus = this.state.tasksStatus; //"uncompletedTasks";
        const otherDataStyle = {
            display:this.state.otherDataVisible ? "block" : "none"
        };
        let userSelected = (this.state.userId === this.state.selectedUserId) ? "userSelected" : "";
        return(

            <div className={`UserComp ${taskStatus} ${userSelected}`} >
                <Link to={`/user/${this.state.userId}`} >
                    <div className={"rowDiv id"}
                         onClick={() => this.props.selectUser(this.state.userId)}
                    >
                        <span className={"label"}> ID :</span>
                        <span>{this.state.userId}</span>
                    </div>
                </Link>
                <div className={"rowDiv name"}>
                    <span className={"label"}> Name :</span>
                        <input type="text" name={"name"}
                               value={this.state.name}
                                onChange={this.updateField}/>
                </div>
                <div className={"rowDiv email"}>
                    <span className={"label"}> Email :</span>
                        <input type="text" name={"email"}
                              value={this.state.email}
                               onChange={this.updateField}/>
                </div>

                <div className={"buttonsAndOtherData"}>
                    <input type="button" className={"otherDataButton  button"}
                           onMouseOver={this.showOtherData}
                           onClick={this.hideShowData}
                           value={"Other Data"}/>

                    <div className={"otherDataDiv"} style={otherDataStyle} >
                        <div className={"rowDiv"}>
                            <span className={"label"}> Street :</span>
                            <input type="text" name={"street"} value={this.state.street} onChange={this.updateField}/>
                        </div>
                        <div className={"rowDiv"}>
                            <span className={"label"}> City :</span>
                            <input type="text" name={"city"} value={this.state.city} onChange={this.updateField}/>
                        </div>
                        <div className={"rowDiv"}>
                            <span className={"label"}> Zipcode :</span>
                            <input type="text" name={"zipcode"} value={this.state.zipcode} onChange={this.updateField}/>
                        </div>
                    </div>

                    <input type="button" className={"userButton  button"}
                           onClick={() => this.props.updateUser(this)}
                           value={"Update"}
                    />
                    <input type="button" className={"userButton  button"}
                           onClick={() => this.props.deleteUser(this.state.userId)}
                           value={"Delete"}/>
                </div>
            </div>
        );

    }
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        deleteUser: (userId) =>
        {
            dispatch({ type: 'DELETE_USER',userId:userId })
        },
        updateUser: (userObj ) =>
        {
            let updatedUserKeys =[
                'userId',
                'name',
                'email',
                'street',
                'city',
                'zipcode'
            ];
            let updatedUserData = userObj.pickUpdatedKeysFromObject(userObj.state,updatedUserKeys);
            dispatch({ type : 'UPDATE_USER', updatedUserData : updatedUserData});
        },
        selectUser: (userId) =>
        {
            dispatch({ type : 'SELECT_USER', userId : userId});
        }
    }
}

export default (connect(
    null,
    mapDispatchToProps
)(UserComp));