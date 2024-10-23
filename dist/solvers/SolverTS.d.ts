import { AbstractSolver, DecryptionKey, EncryptedCrossword, type DecryptedCrossword, type InitializeInput, type SolveInput } from "../base.js";
export default class Solver extends AbstractSolver {
    static readonly teamName = "Team 10";
    keys: Map<number, string>;
    dictionary: string[];
    encryptedCW: EncryptedCrossword;
    partialDecryptedCW: (number | string)[][];
    decryptedCW: DecryptedCrossword;
    initialize(input: InitializeInput): void;
    solve(input: SolveInput): DecryptedCrossword;
    findAllMatches: () => void;
    findUniqueKeys: (key: DecryptionKey) => Map<any, any>;
    getConsecutiveSequences(encryptedArray: EncryptedCrossword): any[];
    replaceNumbersWithKeys: (encrypted: EncryptedCrossword, key: DecryptionKey) => (string | number)[][];
    decryptCW: (partiallyDecryptedCW: any, uniqueKeys: any) => any;
    findmatchingWord(partiallyDecryptedWord: (string | number)[]): string[];
    wordMatch(dictionaryWord: string, word: (string | number)[]): number;
    findmatchingWord2(partialDecryptedWord: any, dictionary: string[]): string | string[];
}
//# sourceMappingURL=SolverTS.d.ts.map