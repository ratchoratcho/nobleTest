// this is my sample code to check the behavior of noble when connecting or connected

const noble = require('noble');
const serviceUUIDs = ['3c111001c75c50c41f1a6789e2afde4e'];
const rssiThreshold = -60;

noble.on('stateChange', state => {
    if (state === 'poweredOn') {
        console.log('scannnig');
        noble.startScanning(serviceUUIDs, true);
    } else {
        console.log('noble state: ' + state);
        noble.stopScanning();
    }
});

noble.on('scanStart', () => {
    console.log('scan start');
});

noble.on('scanStop', () => {
    // 1台 connect した時に `scanStop` イベントがなぜか呼ばれてしまう
    // これが呼ばれた時にはしっかりスキャンが止まっている
    // ここでは，スキャンを継続するために，`startScanning()` を呼んでいる
    console.log('scan stop');
    noble.startScanning(serviceUUIDs, true);
});

noble.on('discover', peripheral => {
    if (peripheral.rssi < rssiThreshold) {
        return;
    }
    console.log(peripheral.address + ': discovered, rssi: ' + peripheral.rssi);
    connectAndSetup(peripheral);
});

function connectAndSetup(peripheral) {
    peripheral.once('connect', () => {
        console.log(peripheral.address + ': connected');
    });

    peripheral.once('disconnect', () => {
        console.log(peripheral.address + ': disconnected');
    });

    peripheral.connect(error => {
        if(error) {
            console.log("error: " + error.message);
        }
    });
}
