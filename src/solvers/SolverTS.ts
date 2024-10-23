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
  decipherWords(): void {}

  // use the keys map to generate decryptedCW
  solveCrossword(): void {}
}
