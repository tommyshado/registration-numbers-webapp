// modules import
import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import registrationApp from "./registration-numbers.js"

// instances
const app = express();
const registrationsApp = registrationApp();

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


// functions

// created this function just in case I will need it later on
const getRegistrationNumbers = (regArray) => {
    let cloneRegNumbersArray = []
    regArray.forEach(regNumber => {
        cloneRegNumbersArray.push(Object.keys(regNumber));
    });
    return cloneRegNumbersArray;
}

// ROUTES

app.get("/", (req, res) => {
    console.log(registrationsApp.getRegNumbers());
    res.render("index", {
        registrationNumbers: getRegistrationNumbers(registrationsApp.getRegNumbers()),
        messages: registrationsApp.getMessages(),
        alertClassNames: registrationsApp.getAlertClassNames(),
    });
});

app.post("/sendRegNumber", (req, res) => {
    const regNumberInput = req.body.regNumberInput;
    registrationsApp.setRegNumber(regNumberInput);
    res.redirect("/");
});

app.post("/reset", (req, res) => {
    registrationsApp.resetApp();
    res.redirect("/");
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log("App started at:", PORT);
});