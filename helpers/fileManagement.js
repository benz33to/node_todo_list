import fs from "fs";

const pathToFile = './db/data.json'

const saveFile = (data) => {
    
    fs.writeFileSync(pathToFile, JSON.stringify(data));
};

const readFile = () => {

    if (!fs.existsSync(pathToFile)) {
        return null;
    }
    const info = fs.readFileSync(pathToFile, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}

export { saveFile, readFile };