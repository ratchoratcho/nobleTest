// this is an example code : https://github.com/noble/noble/blob/master/examples/advertisement-discovery.js

const noble = require('noble');

console.log('noble test');
const serviceUUIDs = ['3c111001c75c50c41f1a6789e2afde4e'];

noble.on('stateChange', state => {
    if (state === 'poweredOn') {
        console.log('scannnig');
        noble.startScanning(serviceUUIDs, true);
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', peripheral => {
    console.log('peripheral discovered (' + peripheral.id + ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' + ' connectable ' + peripheral.connectable + ',' + ' RSSI ' + peripheral.rssi + ':');
    console.log('\thello my local name is:');
    console.log('\t\t' + peripheral.advertisement.localName);
    console.log('\tcan I interest you in any of the following advertised services:');
    console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

    var serviceData = peripheral.advertisement.serviceData;
    if (serviceData && serviceData.length) {
        console.log('\there is my service data:');
        for (var i in serviceData) {
            console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
        }
    }
    if (peripheral.advertisement.manufacturerData) {
        console.log('\there is my manufacturer data:');
        console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
    }
    if (peripheral.advertisement.txPowerLevel !== undefined) {
        console.log('\tmy TX power level is:');
        console.log('\t\t' + peripheral.advertisement.txPowerLevel);
    }
    console.log();
});