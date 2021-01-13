const configuration = null;
var peerConnection = new RTCPeerConnection(configuration, {
    optional : [ {
        RtpDataChannels : true
    } ]
});
var dataChannel = peerConnection.createDataChannel("dataChannel", { reliable: true });

dataChannel.onerror = function(error) {
    console.log("Error:", error);
};
dataChannel.onclose = function() {
    console.log("Data channel is closed");
};
