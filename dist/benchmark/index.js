import { toPrecision } from './utils.js';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const MAX_SOLVING_TIME = 60;
const defer = () => {
    const container = {};
    return Object.assign(new Promise((resolve, reject) => Object.assign(container, { resolve, reject })), container);
};
const logWriter = () => {
    let first = true;
    return (text) => {
        if (first) {
            first = false;
        }
        else {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }
        process.stdout.write(text);
    };
};
const timeout = (time) => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), time));
export const runBenchmark = async (level, solverKey) => {
    let teamName = '';
    let initializationTime = 0;
    let solvingTime = 0;
    let totalExecutionTime = 0;
    let solved = 0;
    let failed = 0;
    let crosswords = 0;
    const logger = logWriter();
    logger(`│ Starting new worker`);
    const results = [];
    const workerReady = defer();
    const worker = new Worker(__dirname + '/runner.js', {
        workerData: {
            level,
            solverKey,
        },
    });
    const solverDone = new Promise((resolve, reject) => {
        worker.on('message', (event) => {
            switch (event.type) {
                case 'ready':
                    teamName = event.teamName;
                    workerReady.resolve();
                    logger(`│ Benchmarking "${teamName}": Preparing worker`);
                    break;
                case 'initialized':
                    initializationTime = event.initializationTime;
                    crosswords = event.crosswords;
                    logger(`│ Benchmarking "${teamName}": Solving`);
                    break;
                case 'solved':
                    const result = Object.assign({}, event);
                    delete result.type;
                    results.push(result);
                    if (event.success) {
                        solved++;
                    }
                    else {
                        failed++;
                    }
                    break;
                case 'done':
                    solvingTime = event.solvingTime;
                    logger(`│ Benchmarking "${teamName}": Done [Solved ${solved} - ${failed} Failed]`);
                    resolve(true);
                    break;
            }
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
    await workerReady;
    logger(`│ Benchmarking "${teamName}": Initializing`);
    try {
        await Promise.race([solverDone, timeout(MAX_SOLVING_TIME * 1000)]);
        totalExecutionTime = initializationTime + solvingTime;
    }
    catch (error) {
        await worker.terminate();
        logger(`│ Benchmarking "${teamName}": error "${error?.message}"`);
        failed = crosswords - solved;
        totalExecutionTime = MAX_SOLVING_TIME;
    }
    console.log('');
    return {
        teamName,
        level,
        initializationTime: toPrecision(initializationTime),
        solvingTime: toPrecision(solvingTime),
        totalExecutionTime: toPrecision(totalExecutionTime),
        solved,
        failed,
        results,
    };
};
//# sourceMappingURL=index.js.map