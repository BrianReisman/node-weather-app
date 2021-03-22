//*core modules
const path = require("path");

//*config core modules
// console.log(__dirname) //*this file's directory (folder)
// console.log(__filename) //*the path to this file itself
// console.log(path.join(__dirname, '../public')) //*__dirname starts at this file's folder's absolute path. Second argument to path.join() is a string which takes 'instructions' for how to navigate from __dirname *relatively* to where you want to point to

//*npm modules
const express = require("express"); //*exposes or returns a function which gets called to create a new server/app
const hbs = require("hbs");
const app = express(); //*we don't pass in any arguments or config the server/app here. We do that using various methods provided on the app/server itself

//Define paths for express config
const publicDirectorPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); //*works with npm i hbs
app.set("views", viewsPath); //*customize this path if you are not namings your views folder, 'views'
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectorPath));
// app.use(express.static(path.join(__dirname, '../public')) //*static() takes the path. Same as above combined with variable defined

// app.get("", (req, res) => {
// res.send("<h1><code>Weather</code></h1>");
// }); //*1st arg, the path, here '' == '/' 2nd arg, cb function specifying what happens when this path is visited (arg #1) vs the specified HTTP method  [GET] in this case. The cb function gets 2 arguments. 1st, req (for request) which is an object containing information about the incoming request to the server. 2nd, res (response) also an object which has lots of methods and allow you to customize the response.

// app.get("/help", (req, res) => {
//   res.send([{ name: "Brian" }, { name: "Sarah" }]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

app.get("/", (req, res) => {
  //!res.render()
  res.render("index", {
    title: "Weather App",
    name: "Brian Reisman",
  }); //*no need for file extention in arg 1. Second arg is an object with an object with all of the values you want that view to access
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Brian Reisman",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "I'm here to help! Just let me know how 🧑",
    title: "Help",
    name: "Brian Reisman",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "An address must be provided",
    });
  }
  res.send({
    forecast: "lovely!",
    location: "Cherry HIll, NJ",
    address: req.query.address,
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

//!Wildcard character added to a subroute of help
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Brian Reisman",
  });
});

//!This needs to come last since it handles 404. * (the wildcard character) matches everything that hasn't been matched so far
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Brian Reisman",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000!");
}); //a method that gets called once per app/server. 1st arg is the port. 2nd is an optional callback function
