const express = require("express")
const server = express();
server.use(express.json())

const projectRouter = require("./projectRouter");
const actionRouter = require("./actionRouter");

server.use("/projectRouter", logger, projectRouter)
server.use("/actionRouter", logger, actionRouter)

//GET TEST (READ)
server.get("/", (req, res) => {
  res.send("GET Server Test");
})

//global custom middleware
function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.url}`
  );
  next(); // tells express to move to next middleware in que
}

server.use(logger);

module.exports = server;