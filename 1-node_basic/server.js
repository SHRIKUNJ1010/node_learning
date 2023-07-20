//for importing files
const path = require("path");
const os = require("os");
const math = require("./math");
const { addition, subtraction, multiplication, division } = require("./export_math");

//some path and os function
console.log("hello world\n");
console.log("OS type: " + os.type() + "\n\n" + "OS version: " + os.version() + "\n\n" + "OS homedir: " + os.homedir() + "\n");
console.log("Directory Name: " + __dirname + "\n");
console.log("File Name: " + __filename + "\n");
console.log("Directory Name from path: " + path.dirname(__filename) + "\n");
console.log("Base Name from path: " + path.basename(__filename) + "\n");
console.log("Extension Name from path: " + path.extname(__filename) + "\n");
console.log(path.parse(__filename));
console.log("");

//math function checking
console.log("Math addition:" + math.add(5, 5) + "\n");
console.log("Math subtraction:" + math.sub(5, 5) + "\n");
console.log("Math multiplication:" + math.mul(5, 5) + "\n");
console.log("Math division:" + math.div(5, 5) + "\n");

//math function with exports will not work if module.export is used
console.log("Math addition function via exports: " + addition(2, 2) + "\n");
console.log("Math subtraction function via exports: " + subtraction(2, 2) + "\n");
console.log("Math multiplication function via exports: " + multiplication(2, 2) + "\n");
console.log("Math division function via exports: " + division(2, 2) + "\n");
