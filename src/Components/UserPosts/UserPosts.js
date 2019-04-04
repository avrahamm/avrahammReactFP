import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostComp from '../PostComp/PostComp';
import './UserPosts.css';
import {Link} from "react-router-dom";

class UserPosts extends Component {
    constructor(props)
    {
        super(props);
        this.state= {userId:0, userPosts:[] };
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        let userId = Number.parseInt(nextProps.match.params.userId);
        let selectedUserId = nextProps.myCustomProps.selectedUserId;
        //for direct loading not by selecting user - wil be redirected.
        if( !selectedUserId || // 0 means no user was selected
            (userId !== selectedUserId) //
        ) {
            nextProps.history.push('/');
        }
        let userPosts = [];
        if ( (nextProps.myCustomProps.posts.length) &&
            Array.isArray(nextProps.myCustomProps.posts[userId]))
        {
            userPosts = nextProps.myCustomProps.posts[userId];
        }
        return {
            userId: userId,
            userPosts: userPosts,
        };
    }

    render() {

        //console.log("UserTodos render");
        let userPostsArray = this.state.userPosts.map( (post, index) =>
            {
                return <PostComp key={index} post={post} />;
            }
        );
        return (
            <div className="UserPosts">
                <div className="UserPostsHeader">
                    <span className={"label"}>
                        <h4>Posts - User {this.state.userId}</h4>
                    </span>
                    <span className={"addPostButton"}>
                        <Link to={`${this.props.match.url}/addPost`}>
                            <input className={"button"}  type="button" value={"Add"} />
                        </Link>
                    </span>
                </div>

                <div className="UserPostsBody">
                    {userPostsArray}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {myCustomProps: state};
}

export default connect(mapStateToProps)(UserPosts);
