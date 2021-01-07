// media devices
const openmediadevices = async (constraints) => {
    return await navigator.mediadevices.getusermedia(constraints);
};

try {
    const stream = openmediadevices({'video': true, 'audio': true});
    console.log('media stream:', stream);
} catch (error) {
    console.log('error accessing media devices', error);
}

const getconnecteddevices = async (type) => {
    const devices = await navigator.mediadevices.enumeratedevices();
    return devices.filter(device => device.kind === type);
};

const videocameras = getconnecteddevices('videoinput');
console.log('cameras found:', videocameras);
// _media devices


