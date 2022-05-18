import React from "react";
import Joy from "./Joy";
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
                        <Joy name='left' forward='FORWARD' backward='BACKWARD' left='LEFT' right='RIGHT'/>
                    </td>
                    <td>
                        <Recording/>
                    </td>
                    <td>
                        <Joy name='right' forward='UP' backward='DOWN' left='LEFT' right='RIGHT'/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Controls;