import React from 'react';
import './PostComp.css';

let PostComp = ({post}) => {
    // console.log("PostComp render userId = " + post.userId + " post Id = " + post.id );
    return (
        <div className={"PostComp"}>
            <div className={"rowDiv"}>
                <span className={"label"}> Title :</span>
                <span className={"content"}>{post.title}</span>
            </div>

            <div className={"rowDiv"}>
                <span className={"label"}> Body :</span>
                <span className={"content"}>{post.body}</span>
            </div>
        </div>
    );
}

export default PostComp;
