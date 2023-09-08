// order_worker.js

const { parentPort, workerData } = require('worker_threads');

function prepareOrder(orderId) {
  console.log(`Chef ${orderId} is preparing order ${workerData.orderId}...`);
  // Simulate some processing time
  setTimeout(() => {
    console.log(`Chef ${orderId} has finished preparing order ${workerData.orderId}`);
    // Send a message to the main thread to indicate that the order is ready
    parentPort.postMessage({ orderId: workerData.orderId });
  }, Math.random() * 3000);
}

prepareOrder(workerData.orderId);
