import express from "express";
import { engine } from "express-handlebars";
import * as handlers from "./lib/handlers.js";
import process from "node:process";
const __dirname = process.cwd();
const app = express();

const port = process.env.PORT || 3000;
// configure Handlebars view engine
app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
    })
);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// endpoints
app.get("/", handlers.home);

app.get("/about", handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

export default app;
if (!process.env.TEST_ENV) {
    app.listen(port, () =>
        console.log(
            `Express started on http://localhost:${port}; ` +
                `press Ctrl-C to terminate.`
        )
    );
}
