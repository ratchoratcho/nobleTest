// this is an example code : https://github.com/noble/noble/blob/master/examples/enter-exit.js

const noble = require('noble');

console.log('noble test');
const serviceUUIDs = ['3c111001c75c50c41f1a6789e2afde4e'];

const rssiThreshold = -60;
const exitGracePeriod = 5000 // milliseconds

let inRange = [];  // なぜサンプルは配列なのか，，，？ inRange = {} で初期かすべきだと思うのだが，，，

noble.on('stateChange', state => {
    if (state === 'poweredOn') {
        console.log('scannnig');
        noble.startScanning(serviceUUIDs, true);
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', peripheral => {
    if (peripheral.rssi < rssiThreshold) {
        return;
    }
    
    var id = peripheral.id;
    var entered = !inRange[id];

    if (entered) {
        inRange[id] = {
            peripheral: peripheral
        };
        console.log('"' + peripheral.advertisement.localName + ', ' + peripheral.address + '" entered (RSSI ' + peripheral.rssi + ') ' + new Date());
        console.log(inRange);
    }

    inRange[id].lastSeen = Date.now();

});

setInterval(function() {
    for (var id in inRange) {
        if (inRange[id].lastSeen < (Date.now() - exitGracePeriod)) {
            var peripheral = inRange[id].peripheral;
  
            console.log('"' + peripheral.advertisement.localName + ', ' + peripheral.address + '" exited (RSSI ' + peripheral.rssi + ') ' + new Date());
  
            delete inRange[id];
        }
    }
}, exitGracePeriod / 2);