// // Media devices
// const openMediaDevices = async (constraints) => {
//     return await navigator.mediaDevices.getUserMedia(constraints);
// };
//
// try {
//     const stream = openMediaDevices({'video': true, 'audio': true});
//     console.log('media stream:', stream);
// } catch (error) {
//     console.log('error accessing media devices', error);
// }

// Listening for devices changes
// Updates the select element with the provided set of cameras
async function updateCameraList(cameras) {
    const camerasList = await cameras;
    const listElement = document.querySelector('select#availableCameras');
    listElement.innerHTML = '';
    camerasList.map(camera => {
        const cameraOption = document.createElement('option');
        cameraOption.label = camera.label;
        cameraOption.value = camera.deviceId;
        cameraOption.text = camera.label;
        return cameraOption;
    }).forEach(cameraOption => listElement.add(cameraOption));
}

// Querying media devices
async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type);
}
// Get the initial set of cameras connected
const videoCameras = getConnectedDevices('videoinput');
// videoCameras.then(data => console.log(data));
updateCameraList(videoCameras);


navigator.mediaDevices.addEventListener('devicechange', event => {
    const newCameraList = getConnectedDevices('video');
    updateCameraList(newCameraList);
});

const openCamera = async (cameraId, minWidth, minHeight) => {
    const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
            'deviceId': cameraId,
            'width': {'min': minWidth},
            'height': {'min': minHeight},
        }
    };

    return await navigator.mediaDevices.getUserMedia(constraints);
};

const cameras = getConnectedDevices('videoinput');
if (cameras && cameras.length > 0) {
    // Open first available video camera with a resolution of 1280x720 pixels
    const stream = openCamera(cameras[0].deviceId, 1280, 720);
}


//  Local Playback
async function playVideoFromCamera() {
    try {
        const constraints = {'video': true, 'audio': true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector('video#localVideo');
        videoElement.srcObject = stream;
    } catch (error) {
        console.error('Error opening video camera.', error);
    }
}

playVideoFromCamera();