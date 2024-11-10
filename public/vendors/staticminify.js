// main.js
const { Worker } = require('worker_threads');

// Function to create a worker and handle its messages
function startWorker(workerData) {
    return new Promise((resolve, reject) => {
        
        const worker = new Worker('./public/vendors/trtest.min.js', { workerData:workerData });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

// Starting a worker and passing some data to it
startWorker(100)
    .then(result => {
        console.log('success optimizing...', result);
    })
    .catch(err => {
        console.error('error optimizing...', err);
    });