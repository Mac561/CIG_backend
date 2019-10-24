const express = require("express"); //importing express package
const server = express(); //declaring the server

server.listen(process.env.PORT || 8080, () => {
  //running on port 8080 OR enviroment port
  if (process.env.PORT != undefined) {
    console.log(`running on port ${process.env.PORT}`);
  } else {
    console.log("running on port 8080");
  }
});
