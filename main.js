<<<<<<< HEAD
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
    call.answer(window.localStream);
    step3(call);
});

// Click handlers setup
$(function(){
    console.log('peer',peer);
    $('#make-call').click(function(){
        // Initiate a call!
        var call = peer.call($('#callto-id').val(), window.localStream);
        step3(call);
    });
    $('end-call').click(function(){
        window.existingCall.close();
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

function step1(){
    // Get audio/video stream
    navigator.getUserMedia({audio: true, video: true},function(stream){
        // Display the video Stream in the video object
        console.log(stream)
        $('#my-video').prop('srcObject',stream);

        window.localStream = stream;
        step2();
    },function(){ $('#step1-error').show(); });
}

function step2(){ 
    // Adjust the UI
    $('#step1','#step3').hide();
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
    $('#step1','#step2').hide();
    $('#step3').show();
=======
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
    call.answer(window.localStream);
    step3(call);
});

// Click handlers setup
$(function(){
    console.log('peer',peer);
    $('#make-call').click(function(){
        // Initiate a call!
        var call = peer.call($('#callto-id').val(), window.localStream);
        step3(call);
    });
    $('end-call').click(function(){
        window.existingCall.close();
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

function step1(){
    // Get audio/video stream
    navigator.getUserMedia({audio: true, video: true},function(stream){
        // Display the video Stream in the video object
        console.log(stream)
        $('#my-video').prop('srcObject',stream);

        window.localStream = stream;
        step2();
    },function(){ $('#step1-error').show(); });
}

function step2(){ 
    // Adjust the UI
    $('#step1','#step3').hide();
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
    $('#step1','$step2').hide();
    $('#step3').show();
>>>>>>> ee5e2cedd27d845df17484fe186bdb95a678e6d9
}