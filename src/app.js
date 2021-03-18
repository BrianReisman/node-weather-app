const express = require("express"); //exposes or returns a function which gets called to create a new server/app
const app = express(); //we don't pass in any arguments or config the server/app here. We do that using various methods provided on the app/server itself

app.get("", (req, res) => {
  res.send("<h1><code>Weather</code></h1>");
}); //1st arg, the path, here '' == '/' 2nd arg, cb function specifying what happens when this path is visited (arg #1) vs the specified HTTP method  [GET] in this case. The cb function gets 2 arguments. 1st, req (for request) which is an object containing information about the incoming request to the server. 2nd, res (response) also an object which has lots of methods and allow you to customize the response.

app.get("/help", (req, res) => {
  res.send([{ name: "Brian" }, { name: "Sarah" }]);
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.get("/weather", (req, res) => {
  res.send({ forecast: "lovely!", location: "Cherry HIll, NJ" });
});

app.listen(3000, () => {
  console.log("server is up on port 3000!");
}); //a method that gets called once per app/server. 1st arg is the port. 2nd is an optional callback function
