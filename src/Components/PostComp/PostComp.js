import React from 'react';
import './PostComp.css';

let PostComp = (props) => {
    // console.log("PostComp render userId = " + props.post.userId + " post Id = " + props.post.id );
    return (
        <div className={"PostComp"}>
            <div className={"rowDiv"}>
                <span className={"label"}> Title :</span>
                <span className={"content"}>{props.post.title}</span>
            </div>

            <div className={"rowDiv"}>
                <span className={"label"}> Body :</span>
                <span className={"content"}>{props.post.body}</span>
            </div>
        </div>
    );
}

export default PostComp;
