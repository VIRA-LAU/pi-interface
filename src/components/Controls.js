import React, {useEffect, useRef, useState} from "react";
import {Joystick} from "react-joystick-component";
import axios from "axios";


export const FORWARD = "FORWARD";
export const BACKWARD = "BACKWARD";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

const Controls = () => {
    const intervalRefLeft = useRef(null)
    const [isRecording, setRecording] = useState(false)


    const intervalRefRight = useRef(null)
    const [leftJoystickDirection, setLeftJoystickDirection] = useState(
        {
            "x": null,
            "y": null,
            "direction": null,
        }
    )
    const [rightJoystickDirection, setRightJoystickDirection] = useState(
        {
            "x": null,
            "y": null,
            "direction": null,
        }
    )
    const handleRecording = () => {
        if (isRecording) {
            setRecording(false);
        } else {
            setRecording(true);
        }
        console.log('Recording: ' + isRecording)
    }

    useEffect(() => {
        const {x, y, direction} = leftJoystickDirection
        clearInterval(intervalRefLeft.current)
        switch (direction) {
            case FORWARD:
                console.log(`Send Forward Request for left joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                handle_left_joystick(x / 50, y / 50)
                intervalRefLeft.current = setInterval(() => {
                    console.log(`Send Forward Request for left joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                    handle_left_joystick(x / 50, y / 50)
                }, 500);
                break;
            case LEFT:
                console.log(`Send Left Request for left joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                handle_left_joystick(x / 50, y / 50)
                intervalRefLeft.current = setInterval(() => {
                    console.log(`Send Left Request for left joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                    handle_left_joystick(x / 50, y / 50)
                }, 500);
                break;
            case RIGHT:
                console.log(`Send Right Request for left joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                handle_left_joystick(x / 50, y / 50)
                intervalRefLeft.current = setInterval(() => {
                    console.log(`Send Right Request for left joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                    handle_left_joystick(x / 50, y / 50)
                }, 500);
                break;
            case BACKWARD:
                console.log(`Send Backward Request for left joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                handle_left_joystick(x / 50, y / 50)
                intervalRefLeft.current = setInterval(() => {
                    console.log(`Send Backward Request for left joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                    handle_left_joystick(x / 50, y / 50)
                }, 500);
                break;
            default:
                clearInterval(intervalRefLeft.current)
                intervalRefLeft.current = null

        }
    }, [leftJoystickDirection])
    useEffect(() => {
        const {x, y, direction} = rightJoystickDirection
        clearInterval(intervalRefRight.current)
        switch (direction) {
            case FORWARD:
                console.log(`Send Forward Request for right joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                handle_right_joystick(x / 50, y / 50)
                intervalRefRight.current = setInterval(() => {
                    console.log(`Send Forward Request for right joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                    handle_right_joystick(x / 50, y / 50)
                }, 500);
                break;
            case LEFT:
                console.log(`Send Left Request for right joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                handle_right_joystick(x / 50, y / 50)
                intervalRefRight.current = setInterval(() => {
                    console.log(`Send Left Request for right joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                    handle_right_joystick(x / 50, y / 50)
                }, 500);
                break;
            case RIGHT:
                console.log(`Send Right Request for right joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                handle_right_joystick(x / 50, y / 50)
                intervalRefRight.current = setInterval(() => {
                    console.log(`Send Right Request for right joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                    handle_right_joystick(x / 50, y / 50)
                }, 500);
                break;
            case BACKWARD:
                console.log(`Send Backward Request for right joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                handle_right_joystick(x / 50, y / 50)
                intervalRefRight.current = setInterval(() => {
                    console.log(`Send Backward Request for right joystick 
                     y ratio: ${y / 50}
                     x ratio: ${x / 50}
                     `)
                    handle_right_joystick(x / 50, y / 50)
                }, 500);
                break;
            default:
                clearInterval(intervalRefRight.current)
                intervalRefRight.current = null

        }
    }, [rightJoystickDirection])


    const handleMoveLeft = (e) => {
        setLeftJoystickDirection(e)

    }

    const handleMoveRight = (e) => {
        setRightJoystickDirection(e)
    }


    const handle_left_joystick = (x, y) => {

        const myParams = {
            X: x,
            Y: y
        };

        if (x != null) {
            axios.post('http://192.168.43.143:5000/left_joystick', myParams)
                .then(function (response) {
                    console.log(response);
                    //Perform action based on response
                })
                .catch(function (error) {
                    console.log(error);
                    //Perform action based on error
                });
        } else {
            alert("The search query cannot be empty")
        }
    }

    const handle_right_joystick = (x, y) => {
        const myParams = {
            X: x,
            Y: y
        };
        if (x != null) {
            axios.post('http://192.168.43.143:5000/right_joystick', myParams)
                .then(function (response) {
                    console.log(response);
                    //Perform action based on response
                })
                .catch(function (error) {
                    console.log(error);
                    //Perform action based on error
                });
        } else {
            alert("The search query cannot be empty")
        }
    }

    return (<div>
        <table className='controls' rules='cols'>
            <th colSpan='3'>Controls</th>
            <tbody>
            <tr className='control'>
                <td>Rover</td>
                <td>Recording</td>
                <td>Camera</td>
            </tr>
                <tr>
                    <td>
                        {leftJoystickDirection.direction === null ? 'None' : leftJoystickDirection.direction}
                    </td>
                    <td>
                    </td>
                    <td>
                        {rightJoystickDirection.direction === null ? 'None' : rightJoystickDirection.direction}
                    </td>
                </tr>
                <tr className='joystick'>
                    <td>
                        <Joystick size={100} throttle={300} move={handleMoveLeft}
                                  stop={handleMoveLeft}/>
                    </td>
                    <td>
                        <button className={isRecording ? 'stop' : 'start'}
                                onClick={handleRecording}>{isRecording ? 'Stop' : 'Start'}</button>
                    </td>
                    <td>
                        <Joystick size={100} throttle={300} move={handleMoveRight}
                                  stop={handleMoveRight}/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)
;
}

export default Controls;