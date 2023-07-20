//this is required for using file system
const fs = require("fs");
const path = require("path");

//this read file function is async function
// so it will not wait for it to finish and will
// execute next sync function first and when
// process of read file gets finished then it will print
// console log data
fs.readFile("./files/testing_01.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("Read file using hardcoded filepath:" + data.toString() + "\n");
});

//for file path do not use hardcoded path but use path join with directory name like below.
//this will read file and return data if exist and will throw error if not exist
fs.readFile(path.join(__dirname, "files", "testing_01.txt"), "utf8", (err, data) => {
    if (err) throw err;
    console.log("Read file using dirname and file name:" + data.toString() + "\n");
});

console.log("I will execute earlier than async functions because i do not wait for process to finish\n");

//to write data in file it will create new file if not exist and will overwrite data in file if exist
fs.writeFile(path.join(__dirname, "files", "testing_02.txt"), "hello this is testing 02 text file.", (err) => {
    if (err) throw err;
    console.log("Write complete" + "\n");
    //to append data in file this will append data in file if exist and will create new file if not exist
    fs.appendFile(path.join(__dirname, "files", "testing_02.txt"), "\n\nThis text in file is appended.", (err) => {
        if (err) throw err;
        console.log("Append complete" + "\n");
        //this will rename the file if exist and will throw error if not exist
        fs.rename(path.join(__dirname, "files", "testing_02.txt"), path.join(__dirname, "files", "testing_03.txt"), (err) => {
            if (err) throw err;
            console.log("Rename complete" + "\n");
        });
    });
});

//exit on uncaught errors
process.on("uncaughtException", (err) => {
    console.error(`There was an uncaught error: ${err}\n`);
    process.exit(1);
});
