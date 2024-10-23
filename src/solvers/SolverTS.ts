import { Key } from "readline";
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
  generateWordList(numOfRows: number, numOfCols: number): void {}

  // convert all the words from numbers to letters and update all keys
  decipherWords(): void {}

  // use the keys map to generate decryptedCW
  solveCrossword(): void {}
}
