import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import './UserComp.css';
import {
    handleDeleteUserThunk,
    handleUpdateUserThunk,
    selectUserAction
} from "../../actions/users";

export default function UserComp({userData}) {
    const dispatch = useDispatch();

    let {
        userId, selectedUserId
    } = userData;

    const [name,   setName]   = React.useState(() => userData.name);
    const [email,  setEmail]  = React.useState(() => userData.email);
    const [street, setStreet] = React.useState(() => userData.street);
    const [city,   setCity]   = React.useState(() => userData.city);
    const [zipcode,setZipcode]= React.useState(() => userData.zipcode);
    const [otherDataVisible, setOtherDataVisible] = React.useState(false);

    const showOtherData = (e) => {
        if (!otherDataVisible) {
            setOtherDataVisible(true);
        }
    }

    const hideShowData = (e) => {
        if (otherDataVisible) {
            setOtherDataVisible(false);
        }
    }

    // dispatching plain actions
    const deleteUser = (userId) => {
        dispatch(handleDeleteUserThunk(userId));
    }

    const updateUser = () => {
        let updatedUserData = {
            userId,
            name,
            email,
            street,
            city,
            zipcode,
        }
        dispatch( handleUpdateUserThunk(updatedUserData));
    }

    const selectUser = (userId) => {
        dispatch(selectUserAction(userId));
    }

    //console.log("UserComp render userId = " + userId);
    const otherDataStyle = {
        display: otherDataVisible ? "block" : "none"
    };
    let userSelected = (userId === selectedUserId) ? "userSelected" : "";
    return (
        <div className={`UserComp ${userSelected}`}>
            <Link to={`/user/${userId}`}>
                <div className={"rowDiv id"}
                     onClick={() => selectUser(userId)}
                >
                    <span className={"label"}> ID :</span>
                    <span>{userId}</span>
                </div>
            </Link>
            <div className={"rowDiv name"}>
                <span className={"label"}> Name :</span>
                <input type="text" name={"name"}
                       value={name}
                       onChange={e => setName(e.target.value) }
                />
            </div>
            <div className={"rowDiv email"}>
                <span className={"label"}> Email :</span>
                <input type="text" name={"email"}
                       value={email}
                       onChange={e => setEmail(e.target.value) }
                />
            </div>

            <div className={"buttonsAndOtherData"}>
                <input type="button" className={"otherDataButton  button"}
                       onMouseOver={showOtherData}
                       onClick={hideShowData}
                       value={"Other Data"}/>

                <div className={"otherDataDiv"} style={otherDataStyle}>
                    <div className={"rowDiv"}>
                        <span className={"label"}> Street :</span>
                        <input type="text" name={"street"} value={street}
                               onChange={e => setStreet(e.target.value) }
                        />
                    </div>
                    <div className={"rowDiv"}>
                        <span className={"label"}> City :</span>
                        <input type="text" name={"city"} value={city}
                               onChange={e => setCity(e.target.value) }
                        />
                    </div>
                    <div className={"rowDiv"}>
                        <span className={"label"}> Zipcode :</span>
                        <input type="text" name={"zipcode"} value={zipcode}
                               onChange={e => setZipcode(e.target.value) }
                        />
                    </div>
                </div>

                <input type="button" className={"userButton  button"}
                       onClick={(e) => updateUser()}
                       value={"Update"}
                />
                <input type="button" className={"userButton  button"}
                       onClick={(e) => deleteUser(userId)}
                       value={"Delete"}/>
            </div>
        </div>
    );
}
