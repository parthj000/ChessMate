import express from "express";
import { Server } from "socket.io";
import http from "http";
import { movePrediction } from "./logic.js";
import { connectDb } from "./mongoose.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDb();

io.on("connection", (socket) => {
  console.log("hii--------", socket.id);

  /********
   *
   * when clicked returns all possible moves of the grid
   * then it will result in changing classname of the element to the dot element;
   *
   *
   */

  socket.on("clicked", (className, boxId, callbackFunc) => {
    console.log(className, boxId);
    const power = className.split(" ")[1];
    const moves = movePrediction(power, boxId);
    callbackFunc(moves);
  });
});

app.use("/home", express.static("client"));

server.listen(3000, () => {
  console.log("app running");
});
