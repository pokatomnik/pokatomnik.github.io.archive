import { encrypt } from './encryption';
import { stringToZip, zipToString } from './compress';

export const dataToUrl = (name, originText, key) => {
    const text = key ? encrypt(originText, key) : originText;
    const encrypted = Boolean(key);
    const stringToCompress = JSON.stringify({name, text, encrypted});

    return stringToZip(stringToCompress);
};

export const urlToData = (url) => zipToString(url)
    .then((decompressedString) => new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(decompressedString));
        } catch (e) {
            reject(e);
        }
    }));
