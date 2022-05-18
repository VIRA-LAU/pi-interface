import React, {useContext, useState} from "react";
import RecContext from "./RecContext";


const Video = (props) => {
    const {isRecording}  = useContext(RecContext)
    const [isVideoVisible, setVideoVisible] = useState(true)
    const handleVideo = () => {
        if (isVideoVisible) {
            setVideoVisible(false)
        } else {
            setVideoVisible(true)
        }
        console.log('Preview: ' + isVideoVisible)
    }
    return (
        <div className='video_feed'>
            <div>
                <h2>Rover Feed</h2>
                {isRecording ? <div/> : <circle className='recording_circle'/>}
            </div>
            {!isVideoVisible ?
                <img
                    src={props.source}
                    alt="Video"
                /> :
                <div/>
            }
            <button className={isVideoVisible ? 'button_true' : 'button_false'}
                    onClick={handleVideo}>{isVideoVisible ? 'Show Video' : 'Hide Video'}
            </button>
        </div>);
}

export default Video;