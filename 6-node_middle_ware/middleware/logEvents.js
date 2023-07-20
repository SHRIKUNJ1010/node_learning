const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const logDirPath = path.join(__dirname, "..", "logs");

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    const logFilePath = path.join(__dirname, "..", "logs", logName);
    console.log(logItem);
    try {
        if (!fs.existsSync(logDirPath)) {
            await fsPromises.mkdir(logDirPath);
        }
        if (fs.existsSync(logFilePath)) {
            await fsPromises.appendFile(logFilePath, logItem);
        } else {
            await fsPromises.writeFile(logFilePath, logItem);
        }
    } catch (err) {
        console.log(err);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logEvents, logger };
