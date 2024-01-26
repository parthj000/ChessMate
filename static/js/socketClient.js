//ek error ayegi ki dono click event mei yeh fark nahi kar payega , agar me bolunga ki box or image pe click karega
import { finaleMoves } from "./kingOriginalMoves.js";
import { check } from "./kingsMate.js";
import { notification } from "./notification.js";

const cookieArr = document.cookie.split(";");
var chapa = 1;
var roomId = cookieArr[0].split("=")[1];
if (roomId == "black" || roomId == "white") {
  roomId = cookieArr[1].split("=")[1];
  chapa = 0;
}

var socket = io();

var ischeck = false;

function all() {
  socket.emit("join-room", roomId);
  socket.on("checkamate", (mes) => {
    alert("YOU WON");
    playAudio("./static/winchess.mp3");
  });

  var allowedMoves;
  var boxClicked;
  var race;
  var oppRace;
  var gameRace = cookieArr[chapa].split("=")[1];

  console.log(gameRace);

  const all = document.getElementsByClassName("box");
  for (let key of all) {
    key.addEventListener("click", (e) => {
      if (
        key.style.backgroundImage != "none" &&
        key.classList[2] == gameRace /***and the gamerace is equal then */
      ) {
        console.log("clicked ----");
        // console.log(key);
        // console.log(key.id, key.classList);
        /****
         *
         *
         * param1:className(the class like box rook)
         * param2:id(id of the box like e5);
         * it has two other functions two
         *
         */

        socket.emit("clicked", key.classList, key.id);
      } else if (
        /**
         * event2 after clicking the elem before the yellow shine appears
         */
        key.childElementCount != 0 ||
        key.children[0].className == "possible-moves"
      ) {
        /**
         */

        let kingPos = document.querySelector(`.${gameRace}.king`).id; //query selector is indeed powerful
        socket.emit(
          "checkAllMates",
          key.id,
          boxClicked,
          kingPos,
          (param, param2) => {
            var result;
            console.log(
              check(kingPos, gameRace),
              "-----------------------mmmmmmm"
            );
            if (ischeck == false) {
              result = notification(
                check(kingPos, gameRace),
                finaleMoves(check(kingPos, gameRace))
              );
            }
            console.log(result, "--------------------------r");

            if (result == "checkmate") {
              socket.emit("checkmate", roomId);
              alert("YOU LOOSE");
              window.location.href = "/";
            } else if (result === "check") {
              ischeck = true;
            } else if (ischeck == true) {
              let parent = document.getElementById(param);
              let url = parent.style.backgroundImage;
              parent.style.backgroundImage = "none";
              const classes = parent.classList;

              let child = document.getElementById(param2);
              console.log(child);
              child.style.backgroundImage = url;
              child.style.backgroundSize = "contain";
              child.classList.add(
                `${classes[1]}`,
                `${classes[2]}`,
                `${classes[3]}`
              );

              parent.classList.remove(
                `${classes[1]}`,
                `${classes[2]}`,
                `${classes[3]}`
              );
              result = notification(
                check(kingPos, gameRace),
                finaleMoves(check(kingPos, gameRace))
              );

              if (result != "check") {
                ischeck = false;
                socket.emit("move-piece", roomId, child.id, parent.id);

                console.log(
                  "hoooooooooooooooooooooooooo----------------------------------------"
                );

                return;
              }

              // console.log(
              //   child.classList,
              //   child.id,
              //   "cleasses--------------------"
              // );
              let child2 = document.getElementById(child.id);
              let class2 = child.classList;

              let url2 = child2.style.backgroundImage;
              let parent2 = document.getElementById(parent.id);
              child2.style.backgroundImage = "none";
              parent2.style.backgroundImage = url;
              parent.style.backgroundSize = "contain";

              parent2.classList.add(
                `${class2[0]}`,
                `${class2[1]}`,
                `${class2[2]}`
              );

              child2.classList.remove(
                `${class2[0]}`,
                `${class2[1]}`,
                `${class2[2]}`
              );

              console.log("yes it is checked");
              return;
            } else if (result === "normal") {
              /******
               * for loop chalayenge
               *
               *
               *
               */

              let parent = document.getElementById(param);
              let url = parent.style.backgroundImage;
              parent.style.backgroundImage = "none";
              const classes = parent.classList;

              let child = document.getElementById(param2);
              console.log(child, "child-------------------------------");
              child.style.backgroundImage = url;
              child.style.backgroundSize = "contain";

              if (
                child.classList[2] != gameRace &&
                child.classList.length > 1
              ) {
                child.classList.remove(
                  `${child.classList[1]}`,
                  `${child.classList[2]}`,
                  `${child.classList[3]}`
                );

                console.log("you are eating", child);
              }
              child.classList.add(
                `${classes[1]}`,
                `${classes[2]}`,
                `${classes[3]}`
              );

              parent.classList.remove(
                `${classes[1]}`,
                `${classes[2]}`,
                `${classes[3]}`
              );
              playAudio("./static/move.mp3");

              /*******
               *
               *
               *
               * this is to remove the highlighted text
               */
              const toRemove = document.querySelectorAll(".possible-moves");
              for (let key of toRemove) {
                key.remove();
              }
              socket.emit("move-piece", roomId, child.id, parent.id);
              /****
               *
               *
               *
               */
            }
          }
        );

        console.log(kingPos, "king----");
        console.log("clicked----", key.id);
        console.log("after clicking", boxClicked);
      }
    });
  }
  socket.on("possible-moves", (moves, boxId, races) => {
    race = races;
    allowedMoves = possibleMoves(moves, race, boxId);
    console.log("hiiiiiiiiiiii");
    console.log(possibleMoves, "posss=-------------");
    boxClicked = boxId;

    console.log(race, "race===---------");
  });

  socket.on("moved", (childID, parentID) => {
    let parent = document.getElementById(parentID);
    let url = parent.style.backgroundImage;
    parent.style.backgroundImage = "none";
    const classes = parent.classList;

    let child = document.getElementById(childID);

    console.log(child, "child-------------------------------");
    child.style.backgroundImage = url;
    child.style.backgroundSize = "contain";
    if (child.classList[3] === "occupied") {
      child.classList.remove(
        `${child.classList[1]}`,
        `${child.classList[2]}`,
        `${child.classList[3]}`
      );
    }

    child.classList.add(`${classes[1]}`, `${classes[2]}`, `${classes[3]}`);

    parent.classList.remove(`${classes[1]}`, `${classes[2]}`, `${classes[3]}`);
  });

  /*******
   *
   * function is callback it will be called and the response will be send to the client as a instruction
   *
   *
   */
  function possibleMoves(moves, race, boxId) {
    const previousArray = document.getElementsByClassName("possible-moves");
    const previous = Array.from(previousArray);
    // console.log(previous.length, "--length");
    for (let key of previous) {
      key.remove();
    }
    /*******
     *
     *
     *
     * this function will be used to add a class possible-moves in the chess board
     * the above method replaces the class name
     */
    for (let elem1 of moves) {
      for (let key of elem1) {
        console.log(key, "000000000000000000000000--------");
        let parent = document.getElementById(key);
        console.log(boxId, "box-------------------------");
        if (document.getElementById(boxId).classList[1] === "knight") {
          if (
            parent.classList[3] == "occupied" &&
            parent.classList[2] == race
          ) {
            continue;
          }
        } else if (document.getElementById(boxId).classList[1] === "pawn") {
          //pawn logic
        } else if (document.getElementById(boxId).classList[1] === "king") {
          console.log("jo");
        } else if (
          parent.classList[3] == "occupied" &&
          parent.classList[2] != race
        ) {
          let child = document.createElement("img");
          child.className = "possible-moves";
          child.src = "../static/img/dot.png";
          child.style.maxWidth = "100%";
          parent.appendChild(child);
          break;
        } else if (
          parent.classList[3] == "occupied" &&
          parent.classList[2] === race
        ) {
          break;
        }

        let child = document.createElement("img");
        child.className = "possible-moves";
        child.src = "../static/img/dot.png";
        child.style.maxWidth = "100%";
        parent.appendChild(child);
      }
    }

    /****
     *
     *
     *
     */
    function checkPieceBox() {
      const box = [];
      for (let key of all) {
        if (key.style.backgroundImage != "none") {
          box.push(key.id);
        }
        return box;
      }
    }
  }
}

function playAudio(aud) {
  const audio = new Audio(aud);
  audio.play();
}

export { all, playAudio };
