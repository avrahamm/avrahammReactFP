import React, { Component } from 'react';
import './PostComp.css';

class PostComp extends Component {

    constructor(props)
    {
        super(props);
        this.state ={
            post:{}
        };
    }

    static getDerivedStateFromProps(nextProps,prevState)
    {
        // from parent props update.
        return {
            post:nextProps.post
        }
    }

    render() {
        //console.log("PostComp render userId = " + this.state.post.userId + " post Id = " + this.state.post.id );

        return(
            <div className={"PostComp"}>
                <div className={"rowDiv"}>
                    <span className={"label"}> Title :</span>
                    <span className={"content"}>{this.state.post.title}</span>
                </div>

                <div className={"rowDiv"}>
                    <span className={"label"}> Body :</span>
                    <span className={"content"}>{this.state.post.body}</span>
                </div>
            </div>
        );
    }
}

export default PostComp;