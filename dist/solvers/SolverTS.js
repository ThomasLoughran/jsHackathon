import { AbstractSolver, } from "../base.js";
export default class Solver extends AbstractSolver {
    static teamName = "Team 10";
    keys = new Map();
    dictionary = new Map();
    encryptedCW = [];
    CWWords = [];
    decryptedCW = [];
    initialize(input) {
        this.formatDictionary(input.dictionary);
    }
    solve(input) {
        this.encryptedCW = input.encrypted;
        this.formatInitialKeys(input.key);
        this.generateWordList(input.rows, input.cols);
        this.decipherWords();
        this.solveCrossword();
        return this.decryptedCW;
    }
    formatDictionary(dictionary) {
        this.dictionary = new Map();
        for (let i = 3; i < 30; i++) {
            this.dictionary.set(i, []);
        }
        for (const word of dictionary) {
            this.dictionary.get(word.length)?.push(word);
        }
    }
    formatInitialKeys(keysList) {
        this.keys = new Map();
        for (const key of keysList) {
            this.keys.set(key.number, key.letter);
        }
    }
    generateWordList(numOfRows, numOfCols) { }
    decipherWords() { }
    solveCrossword() { }
}
//# sourceMappingURL=SolverTS.js.map