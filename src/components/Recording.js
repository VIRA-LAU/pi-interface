import React, {useContext} from "react";
import axios from "axios";
import {IP} from "../App";
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
        axios.post(IP + 'record', params)
            .then(function (response) {
                console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }
    return (
        <div>
            <button className={isRecording ? 'button_true' : 'button_false'}
                    onClick={handleRecording}>{isRecording ? 'Start' : 'Stop'}</button>
        </div>
    );
}

export default Recording;