import {readdir, readFile, writeFile} from 'fs/promises';
import {
  DecryptedCell,
  DecryptedCrossword,
  DecryptionKey,
  EncryptedCell,
  EncryptedCrossword,
} from '../base.js';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

// could use `import.meta.dirname` but that's only available in node >20.11
const __dirname = dirname(fileURLToPath(import.meta.url));

export const DATA_DIR = __dirname + `/../../data/`;

export const dictionary = (
  await readFile(DATA_DIR + 'dictionary.txt', 'utf-8')
).split('\n');

export type CrosswordData = {
  id: string;
  decrypted: DecryptedCrossword;
  encrypted: EncryptedCrossword;
  key: DecryptionKey;
  rows: number;
  cols: number;
};

export const toReadableCrosswordTable = (
  table: DecryptedCrossword | EncryptedCrossword
) => {
  return table.map((row) =>
    row.map((char) => char.toString().padStart(2, ' ') + ' ').join('')
  );
};

export const fromReadableCrosswordTable = <T>(
  table: string[],
  parse: (cell: string) => T
) => {
  return table.map((row) =>
    (row.match(/.{3}/g) ?? [])?.map((cell) => parse(cell))
  );
};

export const saveCrosswordData = async (path: string, data: CrosswordData) => {
  await writeFile(
    path,
    JSON.stringify(
      {
        id: data.id,
        decrypted: toReadableCrosswordTable(data.decrypted),
        encrypted: toReadableCrosswordTable(data.encrypted),
        key: data.key,
        rows: data.rows,
        cols: data.cols,
      },
      null,
      2
    )
  );
};

export const loadCrosswordData = async (
  path: string
): Promise<CrosswordData> => {
  const raw = JSON.parse(await readFile(path, 'utf-8'));

  return {
    id: raw.id,
    decrypted: fromReadableCrosswordTable(
      raw.decrypted,
      (cell) => cell.trim() as DecryptedCell
    ),
    encrypted: fromReadableCrosswordTable(
      raw.encrypted,
      (cell) => Number(cell) as EncryptedCell
    ),
    key: raw.key,
    rows: raw.rows,
    cols: raw.cols,
  };
};

export const loadCrosswords = async (level: number) => {
  const crosswordDir = DATA_DIR + `crosswords/${level}/`;
  const files = await readdir(crosswordDir);
  return await Promise.all(
    files
      .sort((f1, f2) => parseInt(f1, 10) - parseInt(f2, 10)) // sort numerically
      .map((filename) => loadCrosswordData(crosswordDir + filename))
  );
};
