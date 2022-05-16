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

conn.onmessage = e => {
<<<<<<< HEAD
    
}
=======

}

function send(type, data, sendTo){
    conn.send(JSON.stringify({
         sendTo: sendTo,
         type  : type,
         data  : data
    }));
}
>>>>>>> 937b0bfa883518c5939bd6d286431f56b04e0bba
