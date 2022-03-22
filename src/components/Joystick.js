import React, {useEffect, useRef, useState} from "react";
import {Joystick} from "react-joystick-component";
import axios from "axios";
import {IP} from "../App";

export const FORWARD = "FORWARD";
export const BACKWARD = "BACKWARD";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";


const Joy = (props) => {
    const intervalRef = useRef(null)
    const [joystickDirection, setJoystickDirection] = useState(
        {
            "x": null,
            "y": null,
            "direction": null,
        })

    const handleMove = (e) => {
        setJoystickDirection(e)
    }


    const handleJoystick = (x, y) => {

        const myParams = {
            X: x,
            Y: y
        };

        if (x != null) {
            axios.post(IP + props.name + '_joystick', myParams)
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

    useEffect(() => {
        const {x, y, direction} = joystickDirection
        console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
            '\ny ratio: ' + y / 50 +
            '\nx ratio: ' + x / 50)
        clearInterval(intervalRef.current)
        switch (direction) {
            case FORWARD:
                console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                    '\ny ratio: ' + y / 50 +
                    '\nx ratio: ' + x / 50)
                handleJoystick(x / 50, y / 50)
                intervalRef.current = setInterval(() => {
                    console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                        '\ny ratio: ' + y / 50 +
                        '\nx ratio: ' + x / 50)
                    handleJoystick(x / 50, y / 50)
                }, 500);
                break;
            case LEFT:
                console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                    '\ny ratio: ' + y / 50 +
                    '\nx ratio: ' + x / 50)
                handleJoystick(x / 50, y / 50)
                intervalRef.current = setInterval(() => {
                    console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                        '\ny ratio: ' + y / 50 +
                        '\nx ratio: ' + x / 50)
                    handleJoystick(x / 50, y / 50)
                }, 500);
                break;
            case RIGHT:
                console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                    '\ny ratio: ' + y / 50 +
                    '\nx ratio: ' + x / 50)
                handleJoystick(x / 50, y / 50)
                intervalRef.current = setInterval(() => {
                    console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                        '\ny ratio: ' + y / 50 +
                        '\nx ratio: ' + x / 50)
                    handleJoystick(x / 50, y / 50)
                }, 500);
                break;
            case BACKWARD:
                console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                    '\ny ratio: ' + y / 50 +
                    '\nx ratio: ' + x / 50)
                handleJoystick(x / 50, y / 50)
                intervalRef.current = setInterval(() => {
                    console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                        '\ny ratio: ' + y / 50 +
                        '\nx ratio: ' + x / 50)
                    handleJoystick(x / 50, y / 50)
                }, 500);
                break;
            default:
                console.log('null')
                clearInterval(intervalRef.current)
                intervalRef.current = null

        }
    }, [joystickDirection])
    return (
        <div>
            <tr>
                {joystickDirection.direction === null ? 'NONE' : joystickDirection.direction}
            </tr>
            <tr>
                <Joystick size={100} throttle={300} move={handleMove} stop={handleMove}/>
            </tr>
        </div>
    )
        ;
}

export default Joy;