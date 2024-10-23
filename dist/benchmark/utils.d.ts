import { DecryptedCrossword } from '../base.js';
import { BenchmarkResult } from './index.js';
export declare const elapsedTime: (start: ReturnType<NodeJS.HRTime>) => number;
export declare const toPrecision: (number: number, precision?: number) => number;
export declare const isSame: (tableA: DecryptedCrossword, tableB: DecryptedCrossword) => boolean;
export declare const resultsSorter: (resA: BenchmarkResult, resB: BenchmarkResult) => number;
export declare const assignPoints: (data: BenchmarkResult[]) => (BenchmarkResult & {
    points: number;
})[];
//# sourceMappingURL=utils.d.ts.map