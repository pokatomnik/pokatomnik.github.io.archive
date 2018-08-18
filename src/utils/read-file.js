import pick from 'lodash.pick';

const requiredPaths = ['name', 'lastModified', 'size', 'type'];

const readFile = (file, maxSize) => new Promise((resolve, reject) => {
    if (!file) {
        resolve();
    }
    if (file.size > maxSize) {
        reject(new Error('Too big file'));
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
        resolve({
            ...pick(file, requiredPaths),
            result: fileReader.result
        });
    }
    fileReader.onerror = reject;

    fileReader.readAsArrayBuffer(file);
});

export default readFile;
