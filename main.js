const media = navigator.getUserMedia;

var peer = new Peer({
                    debug: 3,
                    config: {'iceServers': [
                    { url: 'stun:stun.l.google.com:19302' },
                    { url: 'stun:stun1.l.google.com:19302' },
                    { url: 'turn:numb.viagenie.ca', username: "nk827998@gmail.com", credential: "Naveen@123"}
                    ]}});

// ON open, set the peer id
peer.on('open',function(){
    $('#my-id').text(peer.id);
});

peer.on('call',function(call){
    // Answer automatically for demo
    console.log(call)
    call.answer(window.localStream);
    step3(call);
});

var callCancel;

// Click handlers setup
$(function(){
    console.log('peer',peer);
    $('#make-call').click(function(){
        // Initiate a call!
        console.log('make-call');
        var call = peer.call($('#callto-id').val(), window.localStream);
        callCancel = call;
        step3(call);
    });
    $('#end-call').click(function(){
        console.log('end-call');
        console.log(callCancel);
        callCancel.close();
        step2();
    });

    // Retry if getUserMedia fails
    $('#step1-retry').click(function(){
        $('#step1-error').hide();
        step1();
    });

    // Get things started
    step1();
});

let streamObj;

function step1(){
    // Get audio/video stream
    navigator.getUserMedia({
        audio: {
            sampleRate: 48000,
            channelCount: 1,
            volumne: 1.0,
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
        },
        video: true,
        },function(stream){
        // Display the video Stream in the video object
        console.log(stream)
        streamObj = stream;
        $('#my-video').prop('srcObject',stream);

        window.localStream = stream;
        step2();
    },function(){ $('#step1-error').show(); });
}

function step2(){ 
    // Adjust the UI
    console.log('step2');
    $('#step1,#step3').hide();
    $('#step2').show();
}

function step3(call){
    // Hang up on an existing call if present
    if(window.existingCall){
        window.existingCall.close();
    }

    // Wait for streamon the call, then setup peer video
    call.on('stream',function(stream){
        $('#their-video').prop('srcObject',stream);
    });
    $('#step1,#step2').hide();
    $('#step3').show();
}