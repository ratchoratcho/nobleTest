// this is my sample code to check the behavior of noble when connecting or connected

const noble = require('noble');
const serviceUUIDs = ['3c111001c75c50c41f1a6789e2afde4e'];
const stroboServiceUUIDs = ['3c111002c75c50c41f1a6789e2afde4e'];
const stroboCharacteristicsUUIDs = ['3c113006c75c50c41f1a6789e2afde4e', '3c113000c75c50c41f1a6789e2afde4e'];
const rssiThreshold = -60;
const obserbedDevice = ['2d:b7:3e:e2:b6:bb', '78:f0:1b:91:da:5a'];

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
    console.log('scan stop');
    noble.startScanning(serviceUUIDs, true);
});

noble.on('discover', peripheral => {
    if (!obserbedDevice.includes(peripheral.address)) {
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
            return;
        }

        // 該当 characteritics っぽいやつのみを探す
        peripheral.discoverSomeServicesAndCharacteristics(stroboServiceUUIDs, stroboCharacteristicsUUIDs, (err, services, characteristics) => {
            console.log(characteristics);
            characteristics.forEach(characteristic => {
                characteristic.on('data', (data, isNotification) => {
                    console.log('received: ');
                    console.log(data);
                    console.log(isNotification);
                });
                characteristic.subscribe(err => {
                    if(err) {
                        console.log(err.message);
                        return;
                    } else {
                        console.log('successfully subscribed');
                    }
                });
            });
        });
    });
}
