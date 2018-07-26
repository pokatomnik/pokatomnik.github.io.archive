import {LZMA_WORKER as LZMA} from 'lzma/src/lzma_worker';

function base64ToByteArray(base64) {
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

export const stringToZip = (string) => new Promise((resolve, reject) => {
    LZMA.compress(string, 9, (result, error) => {
        let base64String;
        if (error) {
            reject(error)
        }
        try {
            base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));
        } catch (e) {
            reject(e);
        }
        resolve(base64String.replace(/\//g, '|'));
    });
});

export const zipToString = (rawData) => new Promise((resolve, reject) => {
    const data = rawData.replace(/\|/g, '/');
    let array;
    try {
        array = base64ToByteArray(data);
    } catch (e) {
        reject(e);
    }

    LZMA.decompress(array, function(rawResult, error) {
        if (error) {
            reject(error);
        }

        let result;

        try {
            result = typeof result === 'string' ? new Uint8Array(rawResult) : rawResult;
        } catch (e) {
            reject(e);
        }

        resolve(result);
    });
});
