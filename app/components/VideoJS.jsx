"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoJS = void 0;
const react_1 = __importDefault(require("react"));
const video_js_1 = __importDefault(require("video.js"));
require("video.js/dist/video-js.css");
const VideoJS = (props) => {
    const videoRef = react_1.default.useRef(null);
    const playerRef = react_1.default.useRef(null);
    const { options, src } = props;
    react_1.default.useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current && videoRef.current) {
            const videoElement = document.createElement("video-js");
            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current.appendChild(videoElement);
            playerRef.current = (0, video_js_1.default)(videoElement, {
                controls: true,
                fluid: true,
                autoplay: true,
                liveui: true,
                bigPlayButton: false,
                controlBar: {
                    seekToLive: true,
                },
                ...options,
            });
            playerRef.current.tech().el().srcObject = src;
        }
    }, [options, videoRef]);
    // Dispose the Video.js player when the functional component unmounts
    react_1.default.useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);
    return (<div data-vjs-player>
      <div ref={videoRef}/>
    </div>);
};
exports.VideoJS = VideoJS;
exports.default = exports.VideoJS;
