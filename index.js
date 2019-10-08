const noble = require('noble');

console.log('noble test');

noble.on('stateChange', state => {
    if (state === 'poweredOn') {
        console.log('scannnig');
        noble.startScanning();
    }
});

noble.on('discover', peripheral => {
    console.log('--------------');
    console.log('BT Address: ' + peripheral.address);
    console.log('Id: ' + peripheral.id);
    console.log('connectable: ' + peripheral.connectable);
    console.log('localName: ' + peripheral.advertisement.localName);
    console.log('rssi: ' + peripheral.rssi);
});
