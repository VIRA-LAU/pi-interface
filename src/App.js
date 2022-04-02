import './App.css'
import Video from "./components/Video";
import Controls from "./components/Controls";
import io from 'socket.io-client';
import React from "react";

export const IP = 'http://192.168.43.143:5000/'
export const socket = io(IP);

const App = () => {
    socket.on('connect', () => {
        console.log('connected to socket');
    })
    socket.on('disconnect', () => {
        console.log('disconnected from socket');
    })

    return (
        <div>
            <header className='title'>
                <h1 className>VIP-VIRA</h1>
            </header>
            <Video source={IP + "video_feed"}/>
            <Controls className='controls'/>
        </div>
    );
};


export default App;