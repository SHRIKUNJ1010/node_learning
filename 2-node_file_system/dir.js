const fs = require("fs");

if (!fs.existsSync("./new_files")) {
    fs.mkdir("./new_files", (err) => {
        if (err) throw err;
        console.log("Directory created \n");
    });
} else {
    console.log("This directory already exist \n");
}

if (fs.existsSync("./new_files")) {
    fs.rmdir("./new_files", (err) => {
        if (err) throw err;
        console.log("Directory removed \n");
    });
} else {
    console.log("This directory does not exist \n");
}
