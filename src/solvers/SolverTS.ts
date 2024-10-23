import { Key } from "readline";
import {
  AbstractSolver,
  EncryptedCrossword,
  type DecryptedCrossword,
  type InitializeInput,
  type SolveInput,
} from "../base.js";

export default class Solver extends AbstractSolver {
  static readonly teamName = "Team 10";
  keys: Map<number, string> = new Map<number, string>();
  dictionary: Map<number, string[]> = new Map<number, string[]>();
  encryptedCW: EncryptedCrossword = [];
  CWWords: (number | string)[][] = [];
  decryptedCW: DecryptedCrossword = [];

  initialize(input: InitializeInput): void {
    // formatDictionary(input.dictionary);
  }
  solve(input: SolveInput): DecryptedCrossword {
    this.encryptedCW = input.encrypted;
    // formatInitialKeys(input.key);
    // generateWordList(input.rows, input.cols);
    // decipherWords();
    // solveCrossword()
    return this.decryptedCW;
  }
  // format dictionary into a map where the key is the length of the words, and the value is the list of words with that length
  formatDictionary(dictionary: string[]): void {}

  // passes supplied keys into a new map to store all keys
  formatInitialKeys(keys: Key[]): void {}

  // start from the decrypted crossword and generate a list of encoded words to be stored in CWWords
  // needs breaking down
  generateWordList(numOfRows: number, numOfCols: number): void {}

  // convert all the words from numbers to letters and update all keys
  decipherWords(): void {}

  // use the keys map to generate decryptedCW
  solveCrossword(): void {}
}
