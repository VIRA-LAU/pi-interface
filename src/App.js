import './App.css'
import Video from "./components/Video";
import Controls from "./components/Controls";

export const IP = 'http://192.168.32.1:5000/'

const App = () => {

    return (
        <div>
            <h1 className='title'>VIP-VIRA</h1>
            <Video source={IP + "video_feed"}/>
            <Controls className='controls'/>
        </div>
    );
};


export default App;