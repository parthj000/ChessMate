var socket = io();
const all = document.getElementsByClassName("box");
for (let key of all) {
  key.addEventListener("click", (e) => {
    if (key.style.backgroundImage != "none") {
      /****
       *
       *
       * param1:className(the class like box rook)
       * param2:id(id of the box like e5);
       * it has two other functions two
       *
       */
      socket.emit(
        "clicked",
        key.className,
        key.id,
        async function callbackFunc(moves) {
          const previousArray =
            document.getElementsByClassName("possible-moves");
          const previous = Array.from(previousArray);

          console.log(previous.length, "--length");

          for (let key of previous) {
            console.log(key.id, "----prev");
            const n = key.classList;
            n.remove("possible-moves");

            key.style.backgroundImage = "none";
          }
          /*******
           *
           *
           *
           * this function will be used to add a class possible-moves in the chess board
           * the above method replaces the class name
           */

          for (let key of moves) {
            document.getElementById(key).style.backgroundImage =
              'url("./dot.png")';
            document.getElementById(key).style.backgroundSize = "contain";
            document.getElementById(key).style.zIndex = "-1";
            document.getElementById(key).classList.add("possible-moves");
          }
        }
      );
    }
    console.log(key.id);
  });
}
function checkPieceBox() {
  const box = [];
  for (let key of all) {
    if (key.style.backgroundImage != "none") {
      box.push(key.id);
    }
    return box;
  }
}
