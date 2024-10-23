import {dictionary, loadCrosswords} from './data.js';
import * as Solvers from '../solvers/index.js';
import {parentPort, workerData} from 'node:worker_threads';
import {elapsedTime, isSame} from './utils.js';
import {AbstractSolver} from '../base.js';

export type Event =
  | {
      type: 'ready';
      teamName: string;
    }
  | {
      type: 'initialized';
      initializationTime: number;
      crosswords: number;
    }
  | {
      type: 'solved';
      id: string;
      success: true;
      executionTime: number;
    }
  | {
      type: 'solved';
      id: string;
      success: false;
      error: unknown;
      executionTime: number;
    }
  | {
      type: 'done';
      solvingTime: number;
    };

if (!parentPort) {
  process.exit(1);
}
const INITIALIZATIONS = 3;

const {level, solverKey} = workerData as {
  level: number;
  solverKey: keyof typeof Solvers;
};

const crosswords = await loadCrosswords(level);
const Solver = Solvers[solverKey];

const readyEvent: Event = {
  type: 'ready',
  teamName: Solver.teamName,
};
parentPort.postMessage(readyEvent);

// one ignored initialization to warm cache, to make results more consistent
let solver = new Solver() as AbstractSolver;
solver.initialize({level, dictionary});

// initialization
const initializationStart = process.hrtime();
for (let i = 0; i < INITIALIZATIONS; i++) {
  solver = new Solver() as AbstractSolver;
  solver.initialize({level, dictionary});
}
const initializationEvent: Event = {
  type: 'initialized',
  initializationTime: elapsedTime(initializationStart) / INITIALIZATIONS,
  crosswords: crosswords.length,
};
parentPort.postMessage(initializationEvent);

// crossword solving
const solvingStart = process.hrtime();
for (const {id, encrypted, decrypted, key, rows, cols} of crosswords) {
  const stepStart = process.hrtime();

  try {
    const solution = solver.solve({id, encrypted, rows, cols, key});

    if (!isSame(solution, decrypted)) {
      throw new Error('Invalid solution');
    }
    const successEvent: Event = {
      type: 'solved',
      id,
      success: true,
      executionTime: elapsedTime(stepStart),
    };
    parentPort.postMessage(successEvent);
  } catch (error) {
    const errorEvent: Event = {
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

const doneEvent: Event = {
  type: 'done',
  solvingTime,
};
parentPort.postMessage(doneEvent);
