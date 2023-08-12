// modules import
import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";

// instances
const app = express();


// ROUTES;

app.get("/", (req, res) => {
    res.send("Registration Numbers Application");
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log("App started at:", PORT);
});