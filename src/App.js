import React from "react";
import Button from '@mui/material/Button';


const Cam = () => {
    return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <img
                    src="http://localhost:5000/video_feed"
                    alt="Video"
                />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>Control</div>
            <Button variant="text">Text</Button>
        </div>
    );
};
export default Cam;
