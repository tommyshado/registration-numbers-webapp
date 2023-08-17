// modules import
import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import registrationApp from "./registration-numbers.js"
import routes from "./routes/routes.js";
import pgPromise from "pg-promise";
import "dotenv/config";
import flash from "express-flash";
import session from "express-session";
import { MemoryStore } from "express-session";

// instances
const app = express();
const pgp = pgPromise();


// initialise session middleware - flash-express depends on it
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: 'keyboard cat'
}))

// initialise the flash middleware
app.use(flash());



const databaseURL = process.env.DB_LINK;


const config = {
    connectionString: databaseURL
}

if (process.env.NODE_ENV === "production") {
    config.ssl = {
        rejectUnauthorized: false
    }
}

const database = pgp(config);

// instance for logic
const registrationsApp = registrationApp(database);

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

app.post("/reset", Routes.resetRoute);

app.post("/filter", Routes.filterRoute);

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log("App started at:", PORT);
});