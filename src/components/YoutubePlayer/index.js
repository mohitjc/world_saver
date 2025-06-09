import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { stopVideoPlayer } from "../../actions/YoutubePlayer";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import './style.scss'

const YoutubePlayer = () => {
    const [isMin, setMin] = useState(false);
    const videoPlayer = useSelector(state => state.YoutubePlayer.videoPlayer);
    const dispatch = useDispatch();

    const minimize = () => {
        let el = document.getElementById("custom-youtube-player")
        setMin(!isMin)
        if (!isMin) {
            el.classList.add('isMin')
        } else {
            el.classList.remove('isMin')
        }
    }


    if (!videoPlayer.visible) {
        return null;
    }

    return (
        <Draggable handle=".handle" disabled={isMin}>
            <div className="custom-youtube-player" id="custom-youtube-player" title={isMin ? 'isMin' : ''}>
                <ResizableBox width={300} height={230} className={isMin ? 'hidecls' : ''}>
                    <iframe
                        id="player"
                        type="text/html"
                        style={{ width: "100%", height: "100%" }}
                        src={`https://www.youtube.com/embed/${videoPlayer.video}?autoplay=1`}
                        frameBorder="0"
                        allow='autoplay'
                        allowFullScreen
                    ></iframe>


                    <div className="minusbutt" onClick={() => minimize()}>
                        <i className={`fa ${!isMin ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true"></i>
                    </div>
                    <div
                        className="closebtn d-flex justify-content-center"
                        onClick={() => dispatch(stopVideoPlayer())}
                    >
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="handle d-flex justify-content-center">
                        <i className="fas fa-arrows-alt"></i>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default YoutubePlayer;