import StringBlowfish from './blowfish';
import BinaryBlowfish from 'egoroof-blowfish';

export const encrypt = (data, key) => {
    if (typeof data !== 'string') {
        return encryptBinary(data, key);
    }
    const encryptor = new StringBlowfish(key);
    return encryptor.encrypt(data);
};

export const decrypt = (data, key) => {
    if (typeof data !== 'string') {
        return decryptBinary(data, key);
    }
    const decryptor = new StringBlowfish(key);
    return decryptor.trimZeros(decryptor.decrypt(data));
};

const encryptBinary = (data, key) => {
    const encryptor = new BinaryBlowfish(key);
    return encryptor.encode(data);
}

const decryptBinary = (data, key) => {
    const decryptor = new BinaryBlowfish(key);
    return decryptor.decode(data, BinaryBlowfish.TYPE.UINT8_ARRAY);
}
