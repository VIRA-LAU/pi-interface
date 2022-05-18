import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RecProvider} from "./components/RecContext";

ReactDOM.render(
    <RecProvider>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </RecProvider>,
    document.getElementById('root')
);
