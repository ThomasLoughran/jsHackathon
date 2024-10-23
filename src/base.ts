// this type is just used to convert a string type into a type that is the union of it's letters
type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}`
  ? Letter | StringToUnion<Rest>
  : never;

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" as const;
export const EMPTY = ".";

export type Letter = StringToUnion<typeof LETTERS>; // 'A' | 'B' | 'C' ...
export type Empty = typeof EMPTY;

export type EncryptedCell = number;
export type EncryptedCrossword = EncryptedCell[][];

export type DecryptedCell = Letter | Empty;
export type PartiallyDecryptedCell = Letter | number | Empty;
export type DecryptedCrossword = DecryptedCell[][];

export type DecryptionKey = { letter: Letter; number: number }[];

export type InitializeInput = {
  level: number;
  dictionary: string[];
};

export type SolveInput = {
  id: string;
  rows: number;
  cols: number;
  encrypted: EncryptedCrossword;
  key: DecryptionKey;
};

export abstract class AbstractSolver {
  static readonly teamName: string;

  abstract initialize(input: InitializeInput): void;

  abstract solve(input: SolveInput): DecryptedCrossword;
}
