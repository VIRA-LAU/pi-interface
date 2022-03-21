import './App.css'
import Video from "./components/Video";
import Controls from "./components/Controls";

const App = () => {

    return (
        <div>
            <h1 className='title'>VIP-VIRA</h1>
            <Video source="http://192.168.43.143:5000/video_feed"/>
            <Controls className='controls'/>
        </div>
    );
};


export default App;