import React, { PureComponent } from 'react';
import './PostComp.css';

class PostComp extends PureComponent {

    constructor(props)
    {
        super(props);
    }

    render() {
        // console.log("PostComp render userId = " + this.props.post.userId + " post Id = " + this.props.post.id );

        return(
            <div className={"PostComp"}>
                <div className={"rowDiv"}>
                    <span className={"label"}> Title :</span>
                    <span className={"content"}>{this.props.post.title}</span>
                </div>

                <div className={"rowDiv"}>
                    <span className={"label"}> Body :</span>
                    <span className={"content"}>{this.props.post.body}</span>
                </div>
            </div>
        );
    }
}

export default PostComp;