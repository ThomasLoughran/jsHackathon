import { DecryptedCrossword, DecryptionKey, EncryptedCrossword } from '../base.js';
export declare const DATA_DIR: string;
export declare const dictionary: string[];
export type CrosswordData = {
    id: string;
    decrypted: DecryptedCrossword;
    encrypted: EncryptedCrossword;
    key: DecryptionKey;
    rows: number;
    cols: number;
};
export declare const toReadableCrosswordTable: (table: DecryptedCrossword | EncryptedCrossword) => string[];
export declare const fromReadableCrosswordTable: <T>(table: string[], parse: (cell: string) => T) => T[][];
export declare const saveCrosswordData: (path: string, data: CrosswordData) => Promise<void>;
export declare const loadCrosswordData: (path: string) => Promise<CrosswordData>;
export declare const loadCrosswords: (level: number) => Promise<CrosswordData[]>;
//# sourceMappingURL=data.d.ts.map