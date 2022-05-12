'use strict';

// buttons
let callBtn = $('#callBtn');

let peerConnection;
let sendTo = callBtn.data('user');
let localStream;

// media info
const constraints ={
    video: true
}

// Video Elements
const localVideo = document.querySelector("#localVideo");
const remoteVideo = document.querySelector("#remoteVideo");

// RTC Peer Connection
function getConnection(){
    if(!peerConnection){
        peerConnection =  new RTCPeerConnection();
    }
}

// ask for media input
async function getCamera(){
    let mediaStream;

    try{

        if(!peerConnection){
            await getConnection();
        }

        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        localVideo.srcObject = mediaStream;
        localStream = mediaStream;
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, mediaStream));

    }catch(error){
        console.log(error);
    }
}

$("#callBtn").on('click', () => {
    getCamera();
});

conn.onopen = e => {
    console.log("connected to websocket");
}


