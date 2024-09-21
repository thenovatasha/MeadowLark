import express from "express";
import { engine } from "express-handlebars";
import * as handlers from "./lib/handlers.js";
import process from "node:process";
import weatherMiddleware from "./lib/middleware/weather.js";
import bodyParser from "body-parser";
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
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/headers", (req, res) => {
    res.type("text/plain");
    const headers = Object.entries(req.headers).map(
        ([key, value]) => `${key}: ${value}`
    );
    res.send(headers.join("\n"));
});

// endpoints
app.get("/", weatherMiddleware, handlers.home);

app.get("/about", handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

export default app;
if (!process.env.TEST_ENV) {
    app.listen(port, () =>
        console.log(
            `Express started on http://localhost:${port}; ` +
                `press Ctrl-C to terminate.`
        )
    );
}
