type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}` ? Letter | StringToUnion<Rest> : never;
export declare const LETTERS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export declare const EMPTY = ".";
export type Letter = StringToUnion<typeof LETTERS>;
export type Empty = typeof EMPTY;
export type EncryptedCell = number;
export type EncryptedCrossword = EncryptedCell[][];
export type DecryptedCell = Letter | Empty;
export type PartiallyDecryptedCell = Letter | number | Empty;
export type DecryptedCrossword = DecryptedCell[][];
export type DecryptionKey = {
    letter: Letter;
    number: number;
}[];
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
export declare abstract class AbstractSolver {
    static readonly teamName: string;
    abstract initialize(input: InitializeInput): void;
    abstract solve(input: SolveInput): DecryptedCrossword;
}
export {};
//# sourceMappingURL=base.d.ts.map