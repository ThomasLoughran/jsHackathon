import { AbstractSolver, DecryptionKey, EncryptedCrossword, type DecryptedCrossword, type InitializeInput, type SolveInput } from "../base.js";
export default class Solver extends AbstractSolver {
    static readonly teamName = "Team 10";
    keys: Map<number, string>;
    dictionary: Map<number, string[]>;
    encryptedCW: EncryptedCrossword;
    CWWords: (number | string)[][];
    decryptedCW: DecryptedCrossword;
    initialize(input: InitializeInput): void;
    solve(input: SolveInput): DecryptedCrossword;
    formatDictionary(dictionary: string[]): void;
    formatInitialKeys(keys: DecryptionKey): void;
    generateWordList(numOfRows: number, numOfCols: number): void;
    decipherWords(): void;
    solveCrossword(): void;
}
//# sourceMappingURL=SolverTS.d.ts.map