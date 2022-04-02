import React, {useEffect, useRef, useState} from "react";
import {Joystick} from "react-joystick-component";
import {socket} from "../App";

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


    useEffect(() => {
            const handleJoystick = (x, y) => {

                const myParams = {
                    X: x,
                    Y: y
                };

                if (x != null) {
                    socket.emit(props.name + "_joystick", myParams);
                }
            }
            const {x, y, direction} = joystickDirection
            console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                '\ny ratio: ' + y / 50 +
                '\nx ratio: ' + x / 50)
            clearInterval(intervalRef.current)
            if (direction !== null) {
                console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                    '\ny ratio: ' + y / 50 +
                    '\nx ratio: ' + x / 50)
                handleJoystick(x / 50, y / 50)
                intervalRef.current = setInterval(() => {
                    console.log('Send ' + direction + ' Request for ' + props.name + ' joystick ' +
                        '\ny ratio: ' + y / 50 +
                        '\nx ratio: ' + x / 50)
                    handleJoystick(x / 50, y / 50)
                }, 100);
            } else {
                console.log('null')
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        },
        [props, joystickDirection]
    )
    const handleDirection = () => {
        switch (joystickDirection.direction) {
            case 'FORWARD': {
                return props.forward;
            }
            case 'LEFT': {
                return props.left;
            }
            case 'RIGHT': {
                return props.right;
            }
            case 'BACKWARD': {
                return props.backward;
            }
            default: {
                return 'NONE'
            }
        }
    }


    return (
        <div>
            <tr>
                {handleDirection()}
            </tr>
            <tr>
                <Joystick size={100} throttle={300} move={handleMove} stop={handleMove}/>
            </tr>
        </div>
    )
        ;
}

export default Joy;