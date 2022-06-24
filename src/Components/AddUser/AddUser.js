import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './AddUser.css';
import {handleAddUserThunk} from "../../actions/users";

export default function AddUser() {

    const dispatch = useDispatch();
    const history = useHistory();
    const selectedUserId = useSelector(state => state.selectedUserId);

    //TODO! useLocalStorage hook for name and email
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");

    function goBack() {
        if (selectedUserId) {
            history.goBack();
        } else {
            history.push(`/`);
        }
    }

    function addUser(name, email) {
        if (!name.length) {
            alert("Name can not be empty!");
            setNameError('nameError')
            return;
        }
        if (!email.length) {
            alert("Body can not be empty!");
            setEmailError('emailError')
            return;
        }
        dispatch(handleAddUserThunk(name, email));
        // reset relevant local storage.
        localStorage[`addUser-name`] = "";
        localStorage[`addUser-email`] = "";
        goBack();
    }

    function cancel() {
        goBack();
    }

    return (
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
                           value={name}
                           onChange={(e) => {
                               let inputName = e.target.name;
                               let value = e.target.value;
                               setName(value);
                               localStorage[`addUser-${inputName}`] = value;
                            }
                           }
                    />
                </div>

                <div className={`rowDiv email ${emailError}`}>
                    <span className={"label"}> Email :</span>
                    <input type="text" name={"email"}
                           value={email}
                           onChange={(e) => {
                               let inputName = e.target.name;
                               let value = e.target.value;
                               setEmail(e.target.value);
                               localStorage[`addUser-${inputName}`] = value;
                            }
                           }
                    />
                </div>

                <div className={"rowDiv buttons"}>
                        <span>
                            <input type="button" className={"userButton  button"}
                                   onClick={cancel}
                                   value={"Cancel"}
                            />
                        </span>
                    <span>
                            <input type="button" className={"userButton  button"}
                                   onClick={
                                       (e) => addUser(name, email)
                                   }
                                   value={"Add"}
                            />
                        </span>
                </div>
            </div>
        </div>
    );
}
