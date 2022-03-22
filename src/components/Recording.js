import React, {useState} from "react";
import axios from "axios";
import {IP} from "../App";
const Recording = () => {
     const [isRecording, setRecording]= useState(true)

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
        axios.post(IP+'record', params)
            .then(function (response) {
                console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }
    return (<button className={isRecording ? 'recording_start': 'recording_stop'}
                    onClick={handleRecording}>{isRecording ? 'Start': 'Stop' }</button>
    );
}

export default Recording;