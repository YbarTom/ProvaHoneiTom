const { parentPort } = require('worker_threads');

parentPort.on('message', (numbers) => {
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    parentPort.postMessage(sum);
});