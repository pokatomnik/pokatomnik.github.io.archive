import Blowfish from './blowfish';

export const encrypt = (message, key) => {
    const encryptor = new Blowfish(key);
    return encryptor.encrypt(message);
};

export const decrypt = (message, key) => {
    const decryptor = new Blowfish(key);
    return decryptor.trimZeros(decryptor.decrypt(message));
};
