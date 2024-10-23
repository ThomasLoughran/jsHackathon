export type Event = {
    type: 'ready';
    teamName: string;
} | {
    type: 'initialized';
    initializationTime: number;
    crosswords: number;
} | {
    type: 'solved';
    id: string;
    success: true;
    executionTime: number;
} | {
    type: 'solved';
    id: string;
    success: false;
    error: unknown;
    executionTime: number;
} | {
    type: 'done';
    solvingTime: number;
};
//# sourceMappingURL=runner.d.ts.map