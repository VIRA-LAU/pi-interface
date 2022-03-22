import React from "react";
import Joystick from "./Joystick";
import Recording from "./Recording";


const Controls = () => {

    return (<div>
            <table className='controls' rules='cols'>
                <th colSpan='3'>Controls</th>
                <tbody>
                <tr className='categories'>
                    <td>Rover</td>
                    <td>Recording</td>
                    <td>Camera</td>
                </tr>
                <tr className='joystick'>
                    <td>
                        <Joystick name='left'/>
                    </td>
                    <td>
                        <Recording/>
                    </td>
                    <td>
                        <Joystick name='right'/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Controls;