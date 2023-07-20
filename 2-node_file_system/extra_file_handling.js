const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, "files", "testing_01.txt"), "utf8");
        console.log('This is read data by promises of "fs":' + data + "\n");

        //this function will delete your file if exist and will throw error if does not exist
        await fsPromises.unlink(path.join(__dirname, "files", "testing_01.txt"));

        await fsPromises.writeFile(path.join(__dirname, "files", "testing_05.txt"), data);
        await fsPromises.appendFile(path.join(__dirname, "files", "testing_05.txt"), "\n\nThis is new append data.");
        await fsPromises.rename(path.join(__dirname, "files", "testing_05.txt"), path.join(__dirname, "files", "testing_06.txt"));
        const newData = await fsPromises.readFile(path.join(__dirname, "files", "testing_06.txt"), "utf8");
        console.log('This is new read data by promises of "fs":' + newData + "\n");
    } catch (err) {
        console.error(err);
    }
};

fileOps();
