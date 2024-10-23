import { AbstractSolver } from "../base.js";
export default class Solver extends AbstractSolver {
    static teamName = "Your Team Name";
    initialize(input) { }
    solve(input) {
        console.log("input: ", input);
        throw new Error("Not implemented");
    }
    findUniqueKeys = (key) => {
        let keyMap = new Map();
        key.forEach((item) => {
            if (!keyMap.has(item.number)) {
                keyMap.set(item.number, item.letter);
            }
        });
        return keyMap;
    };
    replaceNumbersWithKeys = (encrypted, item) => {
        const uniqueKeys = this.findUniqueKeys(item);
        for (let i = 0; i < encrypted.length; i++) {
            for (let j = 0; j < encrypted[i].length; j++) {
                if (uniqueKeys.has(encrypted[i][j])) {
                    encrypted[i][j] = uniqueKeys.get(encrypted[i][j]);
                }
            }
        }
    };
}
//# sourceMappingURL=SolverJS.js.map