const express = require('express');
const app = express();
const { Worker } = require("worker_threads");
const PORT = 3000;

app.use(express.json());

function generateRandomArray(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 1000));
}

function batchify(array, n) {
    let batches = []
    for (let i = n; i > 0; i--) {
        batches.push(array.splice(0, Math.ceil(array.length / i)))
    }
    return batches
}

async function run(numbers, numberOfBatches) {
    const batches = batchify(numbers, numberOfBatches);
    const results = [];

    await Promise.all(
        batches.map((data, i) => {
            return new Promise((resolve) => {
                const sums = new Worker('./sums.js');
                sums.postMessage(data);
                sums.on('message', (result) => {
                    console.log(`Batch ${i} completed with result: ${result}`);
                    results[i] = result;
                    resolve();
                });
            });
        })
    );

    return results;
}


app.post("/generate-and-sum", async (req, res) => {

    const count = req.body.count;

    const randomNumbers = generateRandomArray(count);

    try {
        const results = await run(randomNumbers, 10);

        const totalSum = results.reduce((acc, curr) => acc + curr, 0);

        res.status(200).json({ message: 'All batches completed successfully', totalSum });
    } catch (error) {
        console.error('Error processing batches:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, function () {
    console.log("Server Running at port: " + PORT);
});