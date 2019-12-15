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
        let users = DAL.getData('https://jsonplaceholder.typicode.com/users');
        let posts = DAL.getData('https://jsonplaceholder.typicode.com/posts');
        let todos = DAL.getData('https://jsonplaceholder.typicode.com/todos');

        Promise.all([ users,posts, todos])
            .then((responseData) => {
                const [usersDataObj,postsDataObj,todosDataObj] = responseData;
                const [usersData,postsData,todosData] = [usersDataObj.data,postsDataObj.data,todosDataObj.data];
                console.log(usersData,postsData,todosData);
                Promise.resolve()
                    .then( () => {
                        return this.props.dispatch({type:'INIT_USERS',  'newData':usersData } );
                    })
                    .then( () => {
                        return this.props.dispatch({type:'INIT_POSTS', 'newData':postsData } );
                    })
                    .then( () => {
                        return this.props.dispatch({type:'INIT_TODOS',  'newData':todosData } );
                    })
                    .then(() => {
                        // To commit end of initialization.
                        return this.props.dispatch({type:'INIT_COMMIT',  } )
                    })
            })
            .catch( error => {
                console.log('Failed to fetch data!');
            });
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