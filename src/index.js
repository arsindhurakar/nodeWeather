const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

app.set("view engine", "hbs");

const templatesPath = path.join(__dirname, "../templates/views");
app.set("views", templatesPath);

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Oops! The page you requested not found..",
  });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));

// `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=ef35c631bdf94a479a2ff86495944a2b`
