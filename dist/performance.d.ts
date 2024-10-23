type PerformanceContext = {
    name: string;
    count: number;
    usedTime: number;
    parent: PerformanceContext;
    children: Record<string, PerformanceContext>;
};
export declare const measurePerformance: <T>(name: string, task: () => T) => T;
export declare const resetPerformance: () => void;
export declare const printPerformance: (context?: PerformanceContext, spaces?: number) => void;
export {};
//# sourceMappingURL=performance.d.ts.map