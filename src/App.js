import React, {useEffect, useRef, useState} from "react";
import Button from '@mui/material/Button';
import {Joystick} from "react-joystick-component";

export const FORWARD = "FORWARD";
export const BACKWARD = "BACKWARD";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";


const Cam = () => {

    const intervalRefLeft = useRef(null)
    const intervalRefRight = useRef(null)

    const [leftJoystickDirection,setLeftJoystickDirection] = useState(
        {
            "type": "stop",
            "x": null,
            "y": null,
            "direction": null,
            "distance": null
        }
    )
    const [rightJoystickDirection,setRightJoystickDirection] = useState(
        {
            "type": "stop",
            "x": null,
            "y": null,
            "direction": null,
            "distance": null
        }
    )

    useEffect(() =>{
        const {type,x,y,direction,distance} = leftJoystickDirection
        clearInterval(intervalRefLeft.current)
        switch (direction){
            case FORWARD:
                console.log(`Send Forward Request for left joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                intervalRefLeft.current = setInterval(()=>{
                    console.log(`Send Forward Request for left joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                },500);
                break;
            case LEFT:
                console.log(`Send Left Request for left joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                intervalRefLeft.current = setInterval(()=>{
                    console.log(`Send Left Request for left joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                },500);
                break;
            case RIGHT:
                console.log(`Send Right Request for left joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                intervalRefLeft.current = setInterval(()=>{
                    console.log(`Send Right Request for left joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                },500);
                break;
            case BACKWARD:
                console.log(`Send Backward Request for left joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                intervalRefLeft.current = setInterval(()=>{
                    console.log(`Send Backward Request for left joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                },500);
                break;
            default:
                clearInterval(intervalRefLeft.current)
                intervalRefLeft.current = null

        }
    },[leftJoystickDirection])
    useEffect(() =>{
        const {type,x,y,direction,distance} = rightJoystickDirection
        clearInterval(intervalRefRight.current)
        switch (direction){
            case FORWARD:
                console.log(`Send Forward Request for right joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                intervalRefRight.current = setInterval(()=>{
                    console.log(`Send Forward Request for right joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                },500);
                break;
            case LEFT:
                console.log(`Send Left Request for right joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                intervalRefRight.current = setInterval(()=>{
                    console.log(`Send Left Request for right joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                },500);
                break;
            case RIGHT:
                console.log(`Send Right Request for right joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                intervalRefRight.current = setInterval(()=>{
                    console.log(`Send Right Request for right joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                },500);
                break;
            case BACKWARD:
                console.log(`Send Backward Request for right joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                intervalRefRight.current = setInterval(()=>{
                    console.log(`Send Backward Request for right joystick 
                     y ratio: ${y/50}
                     x ratio: ${x/50}
                     `)
                },500);
                break;
            default:
                clearInterval(intervalRefRight.current)
                intervalRefRight.current = null

        }
    },[rightJoystickDirection])


    const handleMoveLeft = (e)=> {
        setLeftJoystickDirection(e)

    }
    const handleStopLeft = (e)=> {
        setLeftJoystickDirection(e)
    }

    const handleMoveRight = (e)=> {
        setRightJoystickDirection(e)
    }
    const handleStopRight = (e)=> {
        setRightJoystickDirection(e)
    }

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
                padding:'0 10%',
                placeContent:'space-around'
            }}>
                <Joystick size={100}  throttle={300} move={handleMoveLeft} stop={handleMoveLeft}></Joystick>
                <Joystick size={100 }  throttle={300} move={handleMoveRight} stop={handleMoveRight}></Joystick>

            </div>
        </div>
    );
};
export default Cam;
