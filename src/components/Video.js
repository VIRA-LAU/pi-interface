import React from "react";


const Video = (props) => {
    return (
        <div className='feed'>
            <h2>Rover Feed</h2>
            <img
                src={props.source}
                alt="Video"
            />
        </div>);
}


export default Video;