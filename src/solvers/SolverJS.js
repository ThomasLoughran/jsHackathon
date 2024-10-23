// If you want typechecking in javascript add the line `// @ts-check` at the beginning of the file
import { AbstractSolver } from "../base.js";

export default class Solver extends AbstractSolver {
  static teamName = "Your Team Name";

  /**
   * @param {import('../base.js').InitializeInput} input
   */
  initialize(input) {}

  /**
   * @param {import('../base.js').SolveInput} input
   * @returns {import('../base.js').DecryptedCrossword}
   */
  solve(input) {
    console.log("input: ", input);
    throw new Error("Not implemented");
  }

  findUniqueKeys = (key) => {
    let keyMap = new Map();

    key.forEach((item) => {
      if (!keyMap.has(item.number)) {
        keyMap.set(item.number, item.letter);
      }
    });

    return keyMap;
  };

  replaceNumbersWithKeys = (encrypted, item) => {
    const uniqueKeys = this.findUniqueKeys(item);
    for (let i = 0; i < encrypted.length; i++) {
      for (let j = 0; j < encrypted[i].length; j++) {
        if (uniqueKeys.has(encrypted[i][j])) {
          encrypted[i][j] = uniqueKeys.get(encrypted[i][j]);
        }
      }
    }
  };
}

// let encryptedWords = [[1, 5, 7, 2, 7, 8], [2, 4, 3], [4, 7, 8, 3]]
