import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useRouteMatch} from "react-router-dom";
import {convertObjectToItemsArray} from "../Utils/CommonUtils";
import {getUserItems} from "../Utils/api";

export function useFetchUserItems(itemName) {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    let {userId} = useParams();
    userId = Number.parseInt(userId);
    const selectedUserId = useSelector(state =>
        state.users.selectedUserId);

    const itemsWereInitialized = useSelector(state =>
        state[itemName].initialized);

    const userItems = useSelector(state =>
        convertObjectToItemsArray(state[itemName][itemName])
    );
    React.useEffect( () => {
        if (itemsWereInitialized) {
            return;
        }
        getUserItems(userId, itemName)
            .then(curUserItems => {
                const type = `INIT_SELECTED_USER_${itemName.toUpperCase()}`;
                dispatch({
                        type,
                        [itemName]: curUserItems
                    });
                }
            );
        return function unmount(){
            console.log(`${itemName} items, useFetchUserItems useEffect unmount`);
        }
    },[itemName, userId, itemsWereInitialized, dispatch]);

    return [userId,selectedUserId, match, userItems];
}
