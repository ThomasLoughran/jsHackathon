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
        this.updateCWWords();
        this.decipherWords();
        console.log("KeyList: ", this.keys);
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
        const rotatedEncryptedCW = this.rotateMatrixAC([...this.encryptedCW]);
        for (const row of rotatedEncryptedCW) {
            this.CWWords.push(...this.findWordsInRow(row, numOfRows));
        }
    }
    rotateMatrixAC = (matrix) => {
        const transposedMatrix = matrix[0].map((_, i) => matrix.map((row) => row[i]));
        const rotatedMatrix = transposedMatrix.map((row) => row.reverse());
        return rotatedMatrix;
    };
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
    decipherWords() {
        while (this.CWWords.length) {
            for (let i = this.CWWords.length - 1; i >= 0; i--) {
                const word = this.CWWords[i];
                const potentialMatches = this.findPotentialMatches(word, i);
                if (potentialMatches.length === 1) {
                    const matchedWord = this.CWWords.splice(i, 1)[0];
                    if (this.updateKeys(matchedWord, potentialMatches[0])) {
                        this.updateCWWords();
                    }
                }
            }
        }
    }
    updateKeys = (CWWord, dictWord) => {
        let newKeysAdded = false;
        for (let i = 0; i < CWWord.length; i++) {
            const char = CWWord[i];
            if (typeof char === "number" && !this.keys.has(char)) {
                this.keys.set(char, dictWord.charAt(i));
                newKeysAdded = true;
            }
        }
        return newKeysAdded;
    };
    updateCWWords = () => {
        for (let i = this.CWWords.length - 1; i >= 0; i--) {
            const CWWord = this.CWWords[i];
            for (let j = 0; j < CWWord.length; j++) {
                const char = CWWord[j];
                if (typeof char === "number" && this.keys.has(char)) {
                    this.CWWords[i][j] = this.keys.get(char);
                }
            }
            let canRemove = true;
            for (let j = 0; j < CWWord.length; j++) {
                const char = CWWord[j];
                if (typeof char === "number") {
                    canRemove = false;
                    break;
                }
            }
            if (canRemove) {
                this.CWWords.splice(i, 1);
            }
        }
    };
    findPotentialMatches = (word, i) => {
        const potentialMatches = [];
        const dictList = this.dictionary.get(word.length);
        for (const dictWord of dictList) {
            if (this.isPotentialMatch(word, dictWord)) {
                potentialMatches.push(dictWord);
            }
        }
        return potentialMatches;
    };
    isPotentialMatch = (word, dictWord) => {
        const map = new Map();
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (typeof char === "string") {
                if (dictWord.charAt(i) !== char) {
                    return false;
                }
            }
            else {
                if (map.has(dictWord.charAt(i))) {
                    const num = map.get(dictWord.charAt(i));
                    if (num !== char) {
                        return false;
                    }
                }
                else {
                    map.set(dictWord.charAt(i), char);
                }
            }
        }
        return true;
    };
    solveCrossword() { }
}
//# sourceMappingURL=SolverTS.js.map