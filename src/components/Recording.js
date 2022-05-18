import React, {useContext} from "react";
import {socket} from "../App";
import RecContext from "./RecContext";


const Recording = () => {
    const {isRecording, setRecording} = useContext(RecContext)

    const handleRecording = () => {
        if (isRecording) {
            setRecording(false);
        } else {
            setRecording(true);
        }
        console.log('Recording: ' + isRecording)
        const params = {
            record: isRecording
        }
        socket.emit("record", params)

    }
    return (
        <div>
            <button className={isRecording ? 'button_true' : 'button_false'}
                    onClick={handleRecording}>{isRecording ? 'Start' : 'Stop'}</button>
        </div>
    );
}

export default Recording;