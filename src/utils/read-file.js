import pick from 'lodash.pick';

const requiredPaths = ['name', 'lastModified', 'size', 'type'];

const readFile = (file) => new Promise((resolve, reject) => {
    if (!file) {
        resolve();
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
        resolve({
            ...pick(file, requiredPaths),
            result: fileReader.result
        });
    }
    fileReader.onerror = reject;

    fileReader.readAsDataURL(file);
});

export default readFile;
