import { runBenchmark } from "./benchmark/index.js";
import { assignPoints } from "./benchmark/utils.js";
import * as Solvers from "./solvers/index.js";
const MIN_LEVEL = 1;
const MAX_LEVEL = 1;
const PRINT_EXTENDED_RESULTS = false;
for (let level = MIN_LEVEL; level <= MAX_LEVEL; level++) {
    const results = [];
    console.log("┌────────────────────");
    console.log(`│ Level ${level}`);
    console.log("├────────────────────");
    for (const solverKey of Object.keys(Solvers)) {
        const result = await runBenchmark(level, solverKey);
        results.push(result);
        if (PRINT_EXTENDED_RESULTS) {
            console.dir(result.results, { colors: true });
        }
    }
    const scoredResults = assignPoints(results);
    console.table(scoredResults, [
        "level",
        "teamName",
        "points",
        "solved",
        "failed",
        "totalExecutionTime",
        "initializationTime",
        "solvingTime",
    ]);
}
//# sourceMappingURL=index.js.map