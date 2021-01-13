const configuration = null;
var connection = new RTCPeerConnection(configuration);

async function prepareOffer () {
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);

    return JSON.stringify(offer);
}

async function acceptRemoteOffer (offer) {
    await connection.setRemoteDescription(offer);
    const answer = await connection.createAnswer();
    await connection.setLocalDescription(answer);

    return JSON.stringify(answer);
}

async function sendRemoteAnswer (answer) {
    await connection.setRemoteDescription(answer);
}