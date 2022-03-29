import React, {useState} from "react";


const RecContext = React.createContext();

export const RecProvider = (props) => {
    const [isRecording, setRecording] = useState(true)
    return (<RecContext.Provider value={{isRecording, setRecording}}>
            {props.children}
        </RecContext.Provider>
    );
}

export default RecContext;