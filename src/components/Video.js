import React from "react";


const Video = (props) => {
    return (
        <div className='video_feed'>
            {/*<circle className='recording_circle'/>*/}
            <h2>Rover Feed</h2>
            <img
                src={props.source}
                alt="Video"
            />
        </div>);
}

export default Video;