// modules import
import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import registrationApp from "./registration-numbers.js"
import routes from "./routes/routes.js";

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

// ROUTES

// instance
const Routes = routes(registrationsApp);

app.get("/", Routes.homeRoute);

app.post("/sendRegNumber", Routes.sendRegistrationNumber);

app.post("/reset",Routes.resetRoute);

app.post("/filter", Routes.filterRoute);

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log("App started at:", PORT);
});