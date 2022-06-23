import * as React from 'react';
import  { useDispatch } from 'react-redux';
import {Switch,Route} from 'react-router-dom' ;

import './App.css';
import ShowUsers from './Components/ShowUsers/ShowUsers';
import TodosAndPostsOfSelectedUser from './Components/TodosAndPostsOfSelectedUser/TodosAndPostsOfSelectedUser';
import { handleInitialData } from './actions/shared'
import AddUser from "./Components/AddUser/AddUser";
import SearchFilter from './Components/SearchFilter/SearchFilter';

/**
 * Main Component loads data and starts routing tree.
 */
export default function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(handleInitialData())
    }, [dispatch])

    return (
      <div className="App flex">
          <div className={"section Main"}>
            <SearchFilter />
            <ShowUsers />
          </div>
          <div className={"section"}>
              <Switch>
                  <Route path={"/addUser"} component={AddUser}/>
                  <Route path={"/user/:userId"} component={TodosAndPostsOfSelectedUser}/>
              </Switch>
          </div>
      </div>
    );
}
//withRouter(
//@link:https://stackoverflow.com/questions/44356360/react-router-work-on-reload-but-not-when-clicking-on-a-link
//@link:https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
// export default withRouter(connect()(App));