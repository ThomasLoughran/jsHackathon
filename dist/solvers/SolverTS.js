import { AbstractSolver, } from "../base.js";
export default class Solver extends AbstractSolver {
    static teamName = "Team 10";
    keys = new Map();
    dictionary = [];
    encryptedCW = [];
    partialDecryptedCW = [];
    decryptedCW = [];
    initialize(input) {
        this.dictionary = input.dictionary;
    }
    solve(input) {
        this.keys = this.findUniqueKeys(input.key);
        this.encryptedCW = input.encrypted;
        this.partialDecryptedCW = this.getConsecutiveSequences(this.encryptedCW);
        this.partialDecryptedCW = this.replaceNumbersWithKeys(this.partialDecryptedCW, input.key);
        this.findAllMatches();
        this.decryptedCW = this.decryptCW(this.encryptedCW, this.keys);
        return this.decryptedCW;
    }
    findAllMatches = () => {
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < this.partialDecryptedCW.length; i++) {
                this.findmatchingWord(this.partialDecryptedCW[i]);
            }
        }
    };
    findUniqueKeys = (key) => {
        let keyMap = new Map();
        key.forEach((item) => {
            if (!keyMap.has(item.number)) {
                keyMap.set(item.number, item.letter);
            }
        });
        return keyMap;
    };
    getConsecutiveSequences(encryptedArray) {
        function findSequences(arr) {
            let sequences = [];
            let currentSequence = [];
            arr.forEach((num) => {
                if (num !== 0) {
                    currentSequence.push(num);
                }
                else {
                    if (currentSequence.length >= 3) {
                        sequences.push(currentSequence);
                    }
                    currentSequence = [];
                }
            });
            if (currentSequence.length >= 3) {
                sequences.push(currentSequence);
            }
            return sequences;
        }
        let result = [];
        let rows = encryptedArray.length;
        let cols = encryptedArray[0].length;
        for (let row = 0; row < rows; row++) {
            result = result.concat(findSequences(encryptedArray[row]));
        }
        for (let col = 0; col < cols; col++) {
            let columnData = [];
            for (let row = 0; row < rows; row++) {
                columnData.push(encryptedArray[row][col]);
            }
            result = result.concat(findSequences(columnData));
        }
        return result;
    }
    replaceNumbersWithKeys = (encrypted, key) => {
        const partiallyDecryptedCW = encrypted;
        const uniqueKeys = this.findUniqueKeys(key);
        for (let i = 0; i < partiallyDecryptedCW.length; i++) {
            for (let j = 0; j < partiallyDecryptedCW[i].length; j++) {
                if (uniqueKeys.has(partiallyDecryptedCW[i][j])) {
                    partiallyDecryptedCW[i][j] = uniqueKeys.get(partiallyDecryptedCW[i][j]);
                }
                else if (partiallyDecryptedCW[i][j] === "0") {
                    partiallyDecryptedCW[i][j] = ".";
                }
            }
        }
        return partiallyDecryptedCW;
    };
    decryptCW = (partiallyDecryptedCW, uniqueKeys) => {
        for (let i = 0; i < partiallyDecryptedCW.length; i++) {
            for (let j = 0; j < partiallyDecryptedCW[i].length; j++) {
                if (uniqueKeys.has(partiallyDecryptedCW[i][j])) {
                    partiallyDecryptedCW[i][j] = uniqueKeys.get(partiallyDecryptedCW[i][j]);
                }
                else if (partiallyDecryptedCW[i][j] === 0) {
                    partiallyDecryptedCW[i][j] = ".";
                }
            }
        }
        return partiallyDecryptedCW;
    };
    findmatchingWord(partiallyDecryptedWord) {
        const matches = [];
        for (const dictionaryWord of this.dictionary) {
            if (this.wordMatch(dictionaryWord, partiallyDecryptedWord) === 1) {
                matches.push(dictionaryWord);
            }
        }
        if (matches.length == 1) {
            for (let i = 0; i < partiallyDecryptedWord.length; i++) {
                const char = partiallyDecryptedWord[i];
                if (typeof char === "number" && !this.keys.has(char)) {
                    this.keys.set(char, matches[0][i]);
                }
            }
        }
        return matches;
    }
    wordMatch(dictionaryWord, word) {
        const dictionaryWordArray = dictionaryWord.split("");
        if (dictionaryWordArray.length !== word.length)
            return 0;
        for (let i = 0; i < word.length; i++) {
            if (typeof word[i] === "string") {
                if (word[i] !== dictionaryWordArray[i]) {
                    return 0;
                }
            }
        }
        const letterChecker = new Map();
        for (let i = 0; i < dictionaryWordArray.length; i++) {
            if (typeof word[i] === "number")
                continue;
            const letter = dictionaryWordArray[i];
            if (letterChecker.has(letter)) {
                if (letterChecker.get(letter) !== word[i]) {
                    return 0;
                }
            }
            else {
                letterChecker.set(letter, word[i]);
            }
        }
        return 1;
    }
    findmatchingWord2(partialDecryptedWord, dictionary) {
        const matches = [];
        const partialDecryptedWordlength = partialDecryptedWord.length;
        for (const word of dictionary) {
            if (word.length !== partialDecryptedWordlength) {
                continue;
            }
            let isMatch = true;
            for (let i = 0; i < partialDecryptedWordlength; i++) {
                const partialDecryptedWordchar = partialDecryptedWord[i];
                const wordchar = word[i];
                if (typeof partialDecryptedWord === "string") {
                    if (partialDecryptedWordchar !== wordchar) {
                        isMatch = false;
                        break;
                    }
                }
                if (isMatch) {
                    matches.push(word);
                }
            }
            if (matches.length === 1) {
                return matches[0];
            }
        }
        return matches;
    }
}
//# sourceMappingURL=SolverTS.js.map