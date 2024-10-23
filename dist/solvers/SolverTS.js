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
    generateWordList(numOfRows, numOfCols) {
        this.CWWords = [];
        for (const row of this.encryptedCW) {
            this.CWWords.push(...this.findWordsInRow(row, numOfCols));
        }
        console.log("CWWords", this.CWWords);
    }
    findWordsInRow(row, rowLength) {
        const wordList = [];
        let i = 0;
        let j = 0;
        while (i < rowLength) {
            if (row[i] === 0) {
                i++;
            }
            else {
                j = i + 1;
                while (j < rowLength && row[j] !== 0) {
                    j++;
                }
                const slice = row.slice(i, j);
                if (slice.length > 2) {
                    wordList.push(slice);
                }
                i = j;
            }
        }
        return wordList;
    }
    decipherWords() { }
    solveCrossword() { }
}
//# sourceMappingURL=SolverTS.js.map