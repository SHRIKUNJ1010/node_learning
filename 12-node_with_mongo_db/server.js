require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT || 8080;

//connect to mongodb
connectDB();

//custom middleware
app.use(logger);

//handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//cross origin resource sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded data (from-data / content-type: application/x-www-form-urlencoded)
app.use(express(express.urlencoded({ extended: false })));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//server static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/employee", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//verify jwt will be called for all the routes below from where it is called
//so put the route in which you want verify jwt to be called below verify jwt
// and put the route in which you don't want verify jwt to be called above verify jwt
//app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDb");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
