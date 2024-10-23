export type BenchmarkResult = {
    teamName: string;
    level: number;
    initializationTime: number;
    solvingTime: number;
    totalExecutionTime: number;
    solved: number;
    failed: number;
    results: ({
        id: string;
        executionTime: number;
    } & ({
        success: true;
    } | {
        success: false;
        error: unknown;
    }))[];
};
export declare const runBenchmark: (level: number, solverKey: string) => Promise<BenchmarkResult>;
//# sourceMappingURL=index.d.ts.map