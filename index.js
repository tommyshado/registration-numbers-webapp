// modules import
import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";

// instances
const app = express();

app.use(express.static("public"));

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts",
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");
app.set("views", "./views");

// ROUTES;

app.get("/", (req, res) => {
    res.render("index");
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log("App started at:", PORT);
});