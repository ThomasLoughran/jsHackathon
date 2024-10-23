import {
  AbstractSolver,
  DecryptionKey,
  EncryptedCrossword,
  Letter,
  type DecryptedCrossword,
  type InitializeInput,
  type SolveInput,
} from "../base.js";

export default class Solver extends AbstractSolver {
  static readonly teamName = "Team 10";
  keys: Map<number, Letter> = new Map<number, Letter>();
  dictionary: Map<number, string[]> = new Map<number, string[]>();
  encryptedCW: EncryptedCrossword = [];
  CWWords: (number | string)[][] = [];
  decryptedCW: DecryptedCrossword = [];

  initialize(input: InitializeInput): void {
    this.formatDictionary(input.dictionary);
  }
  solve(input: SolveInput): DecryptedCrossword {
    this.encryptedCW = input.encrypted;
    this.formatInitialKeys(input.key);
    this.generateWordList(input.rows, input.cols);
    this.updateCWWords();
    this.decipherWords();
    this.solveCrossword();
    return this.decryptedCW;
  }
  // format dictionary into a map where the key is the length of the words, and the value is the list of words with that length
  formatDictionary(dictionary: string[]): void {
    this.dictionary = new Map<number, string[]>();
    for (let i = 3; i < 30; i++) {
      this.dictionary.set(i, []);
    }
    for (const word of dictionary) {
      this.dictionary.get(word.length)?.push(word);
    }
  }

  // passes supplied keys into a new map to store all keys
  formatInitialKeys(keysList: DecryptionKey): void {
    this.keys = new Map<number, Letter>();
    for (const key of keysList) {
      this.keys.set(key.number, key.letter);
    }
  }

  // start from the decrypted crossword and generate a list of encoded words to be stored in CWWords
  // needs breaking down
  generateWordList(numOfRows: number, numOfCols: number): void {
    // use two pointers
    // make an empty list of all possible words in all rows
    // row by row
    // if you encounter a !0 number, keep track of start point
    // move forward with second pointer until (either 0 char or end of row) is reached
    // find length between two pointers, if at least 3, new word found, copy a slice of the word and add it to words list
    // set the first pointer equal to the second and start the process again until the end of the line
    // repeat the process for the vertical columns (maybe need some rotation)

    // iterate through rows
    this.CWWords = [];
    for (const row of this.encryptedCW) {
      this.CWWords.push(...this.findWordsInRow(row, numOfCols));
    }

    // iterate through cols
    const rotatedEncryptedCW = this.rotateMatrixAC([...this.encryptedCW]);
    for (const row of rotatedEncryptedCW) {
      this.CWWords.push(...this.findWordsInRow(row, numOfRows));
    }
  }

  rotateMatrixAC = (matrix: number[][]) => {
    // transpose image matrix
    const transposedMatrix = matrix[0].map((_, i) =>
      matrix.map((row) => row[i])
    );

    // reverse the order of rows to rotate the image by 90 degrees counterclockwise
    const rotatedMatrix = transposedMatrix.map((row) => row.reverse());
    return rotatedMatrix;
  };

  findWordsInRow(row: number[], rowLength: number): number[][] {
    const wordList: number[][] = [];
    let i: number = 0;
    let j: number = 0;
    while (i < rowLength) {
      if (row[i] === 0) {
        i++;
      } else {
        // hit a number (exciting times)
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

  // convert all the words from numbers to letters and update all keys
  decipherWords(): void {
    // while there are still words in the wordList
    // for each word in wordList
    // evluate if there is a potential match between itself and dict word
    // if there is only on possible match, remove that word and update the keys
    // apply the updated keys to all words

    while (this.CWWords.length) {
      for (let i = this.CWWords.length - 1; i >= 0; i--) {
        const word = this.CWWords[i];
        const potentialMatches = this.findPotentialMatches(word, i);
        if (potentialMatches.length === 1) {
          // only one possible word that matches
          // update keys map with all of the newly discovered key:value pairs
          const matchedWord = this.CWWords.splice(i, 1)[0];

          if (this.updateKeys(matchedWord, potentialMatches[0])) {
            // new keys were added to the keys list, so update the CWWords to fill in potential missing words
            this.updateCWWords();
          }
        }
      }
    }
  }

  // updates they keys map and returns true if any new keys were added to map
  updateKeys = (CWWord: (string | number)[], dictWord: string): boolean => {
    // update keys
    return false;
  };

  // use known keys to paritally solve all CWWords, if a word is completely solved, remove it from list (iterate backwards)
  updateCWWords = () => {};

  // return a list of potential words from dictionary that could match with test word
  findPotentialMatches = (word: (number | string)[], i: number): string[] => {
    const potentialMatches: string[] = [];
    const dictList = this.dictionary.get(word.length);
    for (const dictWord of dictList as string[]) {
      if (this.isPotentialMatch(word, dictWord)) {
        potentialMatches.push(dictWord);
      }
    }
    return potentialMatches;
  };

  // return boolean if the word is potentially the word in the dictionary
  isPotentialMatch = (word: (number | string)[], dictWord: string): boolean => {
    return false;
  };

  // use the keys map to generate decryptedCW
  solveCrossword(): void {}
}
