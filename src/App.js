import React, {useEffect, useRef, useState} from "react";
import Button from '@mui/material/Button';

export const FORWARD = "FORWARD";
export const BACKWARD = "BACKWARD";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";


const Cam = () => {
    const [status,setStatus] = useState("")
    const intervalRef = useRef(null)

    useEffect(() => {
        console.log(status)
        switch (status){
            case FORWARD:
                intervalRef.current = setInterval(()=>{
                    console.log("Send Forward Request")
                },500);
                break;
            case LEFT:
                intervalRef.current = setInterval(()=>{
                    console.log("Send Left Request")
                },500);
                break;
            case RIGHT:
                intervalRef.current = setInterval(()=>{
                    console.log("Send right Request")
                },500);
                break;
            case BACKWARD:
                intervalRef.current = setInterval(()=>{
                    console.log("Send backward Request")
                },500);
                break;
            default:
                clearInterval(intervalRef.current)
                intervalRef.current = null

        }
    },[status])

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <img
                    src="http://localhost:5000/video_feed"
                    alt="Video"
                />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>Control</div>
            <div style={{
                display:'flex',
                placeContent:'center'
            }}>
                <div>
                    <div style={{
                        display:'flex',
                        placeContent:'center'
                    }}>
                        <Button variant="text"
                                onMouseDown={()=> setStatus(FORWARD)}
                                onMouseUp={() => setStatus("")}
                                onTouchStart={()=> setStatus(FORWARD)}
                                onTouchEnd={() => setStatus("")}
                                onTouchCancel={() => setStatus("")}
                        >F</Button>
                    </div>
                    <div style={{display:'flex'}}>
                        <Button variant="text"
                                onMouseDown={()=> setStatus(LEFT)}
                                onMouseUp={() => setStatus("")}
                                onTouchStart={()=> setStatus(LEFT)}
                                onTouchEnd={() => setStatus("")}
                                onTouchCancel={() => setStatus("")}
                        >L</Button>
                        <Button variant="text"
                                onMouseDown={()=> setStatus(BACKWARD)}
                                onMouseUp={() => setStatus("")}
                                onTouchStart={()=> setStatus(BACKWARD)}
                                onTouchEnd={() => setStatus("")}
                                onTouchCancel={() => setStatus("")}
                        >B</Button>
                        <Button variant="text"
                                onMouseDown={()=> setStatus(RIGHT)}
                                onMouseUp={() => setStatus("")}
                                onTouchStart={()=> setStatus(RIGHT)}
                                onTouchEnd={() => setStatus("")}
                                onTouchCancel={() => setStatus("")}
                        >R</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cam;
