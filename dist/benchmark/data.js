import { readdir, readFile, writeFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = __dirname + `/../../data/`;
export const dictionary = (await readFile(DATA_DIR + 'dictionary.txt', 'utf-8')).split('\n');
export const toReadableCrosswordTable = (table) => {
    return table.map((row) => row.map((char) => char.toString().padStart(2, ' ') + ' ').join(''));
};
export const fromReadableCrosswordTable = (table, parse) => {
    return table.map((row) => (row.match(/.{3}/g) ?? [])?.map((cell) => parse(cell)));
};
export const saveCrosswordData = async (path, data) => {
    await writeFile(path, JSON.stringify({
        id: data.id,
        decrypted: toReadableCrosswordTable(data.decrypted),
        encrypted: toReadableCrosswordTable(data.encrypted),
        key: data.key,
        rows: data.rows,
        cols: data.cols,
    }, null, 2));
};
export const loadCrosswordData = async (path) => {
    const raw = JSON.parse(await readFile(path, 'utf-8'));
    return {
        id: raw.id,
        decrypted: fromReadableCrosswordTable(raw.decrypted, (cell) => cell.trim()),
        encrypted: fromReadableCrosswordTable(raw.encrypted, (cell) => Number(cell)),
        key: raw.key,
        rows: raw.rows,
        cols: raw.cols,
    };
};
export const loadCrosswords = async (level) => {
    const crosswordDir = DATA_DIR + `crosswords/${level}/`;
    const files = await readdir(crosswordDir);
    return await Promise.all(files
        .sort((f1, f2) => parseInt(f1, 10) - parseInt(f2, 10))
        .map((filename) => loadCrosswordData(crosswordDir + filename)));
};
//# sourceMappingURL=data.js.map