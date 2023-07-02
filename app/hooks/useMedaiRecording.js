"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("@huddle01/react/hooks");
const react_1 = require("react");
const NFTStorageProvider_1 = require("../providers/NFTStorageProvider");
const useMediaRecording = (messageApi) => {
    const { peers } = (0, hooks_1.usePeers)();
    const [isRecording, setIsRecording] = (0, react_1.useState)(false);
    const [recorder, setRecorder] = (0, react_1.useState)();
    const [isReadyToDownload, setIsReadyToDownload] = (0, react_1.useState)(false);
    const [blobUrl, setBlobUrl] = (0, react_1.useState)("");
    const client = (0, NFTStorageProvider_1.useNFTStorage)();
    const startRecord = (isHost = false, camStream, micStream) => {
        const mediaStream = new MediaStream();
        if (isHost) {
            camStream
                ?.getVideoTracks()
                .forEach((track) => mediaStream.addTrack(track));
            micStream
                ?.getAudioTracks()
                .forEach((track) => mediaStream.addTrack(track));
        }
        else {
            const tmp = Object.values(peers).find((peer) => peer.role === "host");
            if (!tmp)
                return;
            mediaStream.addTrack(tmp.cam);
            mediaStream.addTrack(tmp.mic);
        }
        const mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                const blob = new Blob([event.data], { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                setBlobUrl(url);
                setIsReadyToDownload(true);
            }
        };
        mediaRecorder.onstart = (event) => messageApi.success("Recording started");
        mediaRecorder.onstop = (event) => messageApi.success("Recording stop");
        mediaRecorder.start();
        setRecorder(mediaRecorder);
        setIsRecording(true);
    };
    const stopRecord = () => {
        if (!recorder)
            return;
        recorder.stop();
        setIsRecording(false);
    };
    const downloadVideo = async () => {
        if (blobUrl === "")
            return;
        const blob = await fetch(blobUrl).then((r) => r.blob());
        console.log(blob);
        // const cid = await client.storeBlob(blob);
        // console.log(cid);
    };
    return {
        startRecord,
        stopRecord,
        isRecording,
        downloadVideo,
        isReadyToDownload,
        blobUrl,
    };
};
exports.default = useMediaRecording;
