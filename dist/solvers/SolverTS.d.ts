import { AbstractSolver, DecryptionKey, EncryptedCrossword, Letter, type DecryptedCrossword, type InitializeInput, type SolveInput } from "../base.js";
export default class Solver extends AbstractSolver {
    static readonly teamName = "Team 10";
    keys: Map<number, Letter>;
    dictionary: Map<number, string[]>;
    encryptedCW: EncryptedCrossword;
    CWWords: (number | string)[][];
    decryptedCW: DecryptedCrossword;
    initialize(input: InitializeInput): void;
    solve(input: SolveInput): DecryptedCrossword;
    formatDictionary(dictionary: string[]): void;
    formatInitialKeys(keysList: DecryptionKey): void;
    generateWordList(numOfRows: number, numOfCols: number): void;
    rotateMatrixAC: (matrix: number[][]) => number[][];
    findWordsInRow(row: number[], rowLength: number): number[][];
    decipherWords(): void;
    updateKeys: (CWWord: (string | number)[], dictWord: string) => boolean;
    updateCWWords: () => void;
    findPotentialMatches: (word: (number | string)[], i: number) => string[];
    isPotentialMatch: (word: (number | string)[], dictWord: string) => boolean;
    solveCrossword(): void;
}
//# sourceMappingURL=SolverTS.d.ts.map