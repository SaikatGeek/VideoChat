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

const options = {
    offerToReceiveVideo: 1,
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

async function creatOffer(sendTo){
    await sendIceCandidate(sendTo);
    await pc.createOffer(options);
    await pc.setLocalDescription(pc.localDescription);
    send('client-offer', pc.localDescription, sendTo);
}

function sendIceCandidate(sendTo){
    pc.onicecandidate = e => {
        if(e.candidate !== null){
            //send ice candidate to other client
            send('client-candidate', e.candidate, sendTo);
        }
    }
}

$("#callBtn").on('click', () => {
    getCamera();
    send('is-client-ready', null, sendTo);
});

conn.onopen = e => {
    console.log("connected to websocket");
}

conn.onmessage = async e => {
    let message         = JSON.parse(e.data);
    let by              = message.by;
    let data            = message.data;
    let type            = message.type;
    let profileImage    = message.profileImage;
    let username        = message.username;

    switch(type){
        case 'is-client-ready':
            if(!pc){
                await getConnection();
            }

            if(pc.iceConnectionState === "connected"){
                send('client-already-oncall');
            }
            else{
                // display
                alert('user is calling');
            }
            break;

        case 'client-already-oncall':
            //display popup right here
            setTimeout('window.location.reload(true)', 2000);
            break;
    }
}

function send(type, data, sendTo){
    conn.send(JSON.stringify({
         sendTo: sendTo,
         type  : type,
         data  : data
    }));
}
