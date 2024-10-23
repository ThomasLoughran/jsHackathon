import { dictionary, loadCrosswords } from './data.js';
import * as Solvers from '../solvers/index.js';
import { parentPort, workerData } from 'node:worker_threads';
import { elapsedTime, isSame } from './utils.js';
if (!parentPort) {
    process.exit(1);
}
const INITIALIZATIONS = 3;
const { level, solverKey } = workerData;
const crosswords = await loadCrosswords(level);
const Solver = Solvers[solverKey];
const readyEvent = {
    type: 'ready',
    teamName: Solver.teamName,
};
parentPort.postMessage(readyEvent);
let solver = new Solver();
solver.initialize({ level, dictionary });
const initializationStart = process.hrtime();
for (let i = 0; i < INITIALIZATIONS; i++) {
    solver = new Solver();
    solver.initialize({ level, dictionary });
}
const initializationEvent = {
    type: 'initialized',
    initializationTime: elapsedTime(initializationStart) / INITIALIZATIONS,
    crosswords: crosswords.length,
};
parentPort.postMessage(initializationEvent);
const solvingStart = process.hrtime();
for (const { id, encrypted, decrypted, key, rows, cols } of crosswords) {
    const stepStart = process.hrtime();
    try {
        const solution = solver.solve({ id, encrypted, rows, cols, key });
        if (!isSame(solution, decrypted)) {
            throw new Error('Invalid solution');
        }
        const successEvent = {
            type: 'solved',
            id,
            success: true,
            executionTime: elapsedTime(stepStart),
        };
        parentPort.postMessage(successEvent);
    }
    catch (error) {
        const errorEvent = {
            type: 'solved',
            id,
            success: false,
            error,
            executionTime: elapsedTime(stepStart),
        };
        parentPort.postMessage(errorEvent);
    }
}
const solvingTime = elapsedTime(solvingStart);
const doneEvent = {
    type: 'done',
    solvingTime,
};
parentPort.postMessage(doneEvent);
//# sourceMappingURL=runner.js.map