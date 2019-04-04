import React, { Component } from 'react';
import  { connect } from 'react-redux';
import {Switch,Route} from 'react-router-dom' ;
import './App.css';
import ShowUsers from './Components/ShowUsers/ShowUsers';
import TodosAndPostsOfSelectedUser from './Components/TodosAndPostsOfSelectedUser/TodosAndPostsOfSelectedUser';
import DAL from "./Utils/DALUtils";
import AddUser from "./Components/AddUser/AddUser";
import SearchFilter from './Components/SearchFilter/SearchFilter';

/**
 * Main Component loads data and starts routing tree.
 */
class App extends Component {

    /**
     * To get data from the web and send to redux store.
     */
    componentDidMount()
    {
//@link:https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence
        let p = Promise.resolve();
        p.then(() => {
            let r1 = DAL.getData('https://jsonplaceholder.typicode.com/users')
                .then(resp => {
                    //console.log(resp.data);
                    this.props.dispatch({type:'INIT_USERS',  'newData':resp.data } )
                } );
            return r1;
        })
        .then(() => {
            let r2 = DAL.getData('https://jsonplaceholder.typicode.com/posts')
                .then(resp => {
                    //console.log(resp.data);
                    this.props.dispatch({type:'INIT_POSTS', 'newData':resp.data } )
                } );
            return r2;
        })
        .then(() => {
            return DAL.getData('https://jsonplaceholder.typicode.com/todos')
                .then(resp => {
                    //console.log(resp.data);
                    this.props.dispatch({type:'INIT_TODOS', 'newData':resp.data } )
                } );
        })
            .then(() => {
                this.props.dispatch({type:'INIT_COMMIT',  } )
            })
        ;
    }

  render() {
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
}
//withRouter(
//@link:https://stackoverflow.com/questions/44356360/react-router-work-on-reload-but-not-when-clicking-on-a-link
//@link:https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
// export default withRouter(connect()(App));
export default (connect()(App));