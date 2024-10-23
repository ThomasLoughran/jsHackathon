const MAX_POINTS_PER_LEVEL = 100;
const MAX_PERFORMANCE_POINT_LOSS = 20;
const POINTS_LOSS_PER_PERCENT_TIME = 0.2;
const POINTS_LOSS_PER_FAILURE = 1;
export const elapsedTime = (start) => {
    const delta = process.hrtime(start);
    return delta[0] + delta[1] / 1_000_000_000;
};
export const toPrecision = (number, precision = 5) => Number(number.toFixed(precision));
export const isSame = (tableA, tableB) => {
    return (tableA.map((row) => row.join('|')).join('\n') ===
        tableB.map((row) => row.join('|')).join('\n'));
};
export const resultsSorter = (resA, resB) => {
    if (resB.solved !== resA.solved) {
        return resB.solved - resA.solved;
    }
    else {
        return resA.totalExecutionTime - resB.totalExecutionTime;
    }
};
export const assignPoints = (data) => {
    data.sort(resultsSorter);
    let previousPoints = MAX_POINTS_PER_LEVEL;
    return data.map((current, index, arr) => {
        let pointsLoss = 0;
        if (index === 0) {
            pointsLoss = current.failed;
        }
        else {
            const previous = arr[index - 1];
            if (current.solved === previous.solved) {
                const deltaExecutionTime = current.totalExecutionTime - previous.totalExecutionTime;
                const deltaExecutionTimePct = (deltaExecutionTime / previous.totalExecutionTime) * 100;
                pointsLoss = Math.min(MAX_PERFORMANCE_POINT_LOSS, deltaExecutionTimePct * POINTS_LOSS_PER_PERCENT_TIME);
            }
            else {
                const deltaSolved = previous.solved - current.solved;
                pointsLoss = deltaSolved * POINTS_LOSS_PER_FAILURE;
            }
        }
        const points = Math.max(Math.floor(previousPoints - pointsLoss), 0);
        previousPoints = points;
        return {
            ...current,
            points,
        };
    });
};
//# sourceMappingURL=utils.js.map