// food_delivery_service.js

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const orderIds = [1, 2, 3, 4, 5]; // Simulate five different food orders

if (isMainThread) {
  // This code runs in the main thread

  // Create an array to keep track of completed orders
  const completedOrders = [];

  // Create a worker for each order
  orderIds.forEach((orderId) => {
    const worker = new Worker('./order_worker.js', { workerData: { orderId } });

    // Listen for messages from the workers when they finish preparing an order
    worker.on('message', (result) => {
      console.log(`Order ${result.orderId} is ready for delivery.`);
      completedOrders.push(result.orderId);

      // Check if all orders are ready
      if (completedOrders.length === orderIds.length) {
        console.log('All orders are ready for delivery. Start delivering.');
      }
    });

    // Handle errors in the worker thread
    worker.on('error', (error) => {
      console.error(`Worker error: ${error}`);
    });
  });
} else {
  // This code runs in the worker thread
  // The actual order preparation work is done in the order_worker.js file
}
