const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "testing_03.txt"), { encoding: "utf8" });
const rs2 = fs.createReadStream(path.join(__dirname, "files", "testing_04.txt"), { encoding: "utf8" });

const ws = fs.createWriteStream(path.join(__dirname, "files", "testing_07.txt"));
const ws2 = fs.createWriteStream(path.join(__dirname, "files", "testing_08.txt"));

//streams are used for large files so it works efficiently.
rs.on("data", (dataChunk) => {
    ws.write(dataChunk);
});

//this function does the same thing as above but this function is more efficient.
rs2.pipe(ws2);
