import express from "express";
import { Server } from "socket.io";
import http from "http";
import { movePrediction } from "./logic.js";

import cookieParser from "cookie-parser";
import path from "path";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
var race;
var roomId;

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId, () => console.log(socket.id, "joined room", roomId));
  });
  socket.on("checkmate", (room) => {
    console.log(room);
    socket.to(room).emit("checkamate", "m");
  });

  console.log("hii--------", socket.id);

  socket.on("move-piece", (room, childID, parentID) => {
    console.log("move received");

    socket.to(room).emit("moved", childID, parentID);
  });

  /********
   *
   * when clicked returns all possible moves of the grid
   * then it will result in changing classname of the element to the dot element;
   *
   *
   */
  socket.on("checkAllMates", (child, parent, kingPos, callback) => {
    console.log(child, parent, kingPos);
    callback(parent, child);
  });

  socket.on("clicked", (classList, boxId) => {
    console.log("clicked");

    console.log(classList, boxId, "------hurr");
    const power = classList[1];
    const race = classList[2];
    const moves = movePrediction(power, boxId, race);
    console.log(moves, "------on second place ");
    socket.emit("possible-moves", moves, boxId, race);
  });
});

app.use(express.json());
app.use(cookieParser());
app.use("/static", express.static("static"));
app.use("/static/js", express.static("client/js"));
app.get("/play", (req, res) => {
  if (race == "black") {
    res.cookie("race", race);
    res.cookie("roomId", roomId);
    return res.sendFile(path.resolve("client/index_bl.html"));
  }

  res.cookie("race", race);
  res.cookie("roomId", roomId);
  res.sendFile(path.resolve("client/index.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.resolve("server/homepage.html"));
});

app.post("/post", (req, res) => {
  console.log(req.body);

  race = req.body.race;
  roomId = req.body.roomId;

  res.send(JSON.stringify({ ok: true, noce: "jjsijsd" }));
});

server.listen(3000, () => {
  console.log("app running");
});
