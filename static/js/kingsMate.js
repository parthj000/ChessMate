import { allkingsmoves, hash1 } from "./king.js";

function check(boxIndex, race) {
  const kingMoves = allkingsmoves(boxIndex);
  var allows = {};
  console.log(kingMoves);

  var num = 1;

  for (let obj in kingMoves) {
    for (let key of kingMoves[obj]) {
      var elem = document.getElementById(key);
      console.log(elem, "---------ELEMENT");
      let m = obj;
      if (kingMoves[obj].length == 0) {
        break;
      } else if (
        elem.classList[3] === "occupied" &&
        elem.classList[2] === race
      ) {
        if (num != 1) {
          allows[m] = `occupied by same race ${kingMoves[obj][0]} yes`;
          break;
        }
        allows[m] = `occupied by same race ${elem.id}`;

        break;
      } else if (
        elem.classList[3] === "occupied" &&
        elem.classList[2] !== race
      ) {
        console.log(elem, "ocer here--------------------");
        let objStr = String(obj);

        allows[m] = checkSituation(objStr, elem, obj, key, kingMoves, num);
        break;
      } else {
        allows[obj] = `empty on whole side ${kingMoves[obj][0]} yes`;
      }
      num = num + 1;
    }
    num = 1;
  }

  allows = checkThroughKnight(boxIndex, allows, race);
  console.log(
    allows,
    "--------------------------------------allows in king mate"
  );
  return allows;
}

/***********
 *
 *
 *
 * this function will run when the obj is white then check if the "check is offered or not ";
 */

function checkSituation(objStr, elem, object, key, kingMoves, num) {
  const piece = elem.classList[1];
  let family = objStr.split("_")[0];
  console.log(piece, family);

  if (family == "straight") {
    if (piece == "rook" || piece == "queen") {
      console.log("check is offered");
      return "check";
    }
    console.log(elem.classList[3], "this element is there");
  } else if (family == "diagonal") {
    //for check with pawn checking
    if (key == kingMoves[object][0] && elem.id == key && piece == "blackpawn") {
      return "check with pawn";
    }

    /****
  
  
  */

    if (piece === "bishop" || piece === "queen") {
      console.log("check is offered");
      return "check";
    }
  }
  if (num != 1) {
    return `not checked by other race ${kingMoves[object][0]}  yes`;
  }

  return "not checked by other race";
}

function checkThroughKnight(boxIndex, allows, race) {
  let gameRace;
  if (race == "black") gameRace = "white";
  if (race == "white") gameRace = "black";
  const knightPos = document.querySelectorAll(`.${gameRace}.knight`);
  const knightMoves = {};

  for (let i = 0; i < knightPos.length; i++) {
    let pos = knightPos[i].id;
    let xCh = pos.split("")[0];
    var x;

    for (let i = 0; i < 8; i++) {
      if (hash1[i] === xCh) {
        x = i;
        break;
      }
    }

    let y = Number(pos.split("")[1]);

    let knightName = i;
    knightMoves[i] = knightLogic(x, y);
  }
  console.log(knightMoves);
  for (let obj in knightMoves) {
    for (let keys of knightMoves[obj]) {
      if (keys === boxIndex) {
        allows.knightCheck = "check";
        return allows;
      }
    }
  }
  delete allows.knightCheck;
  return allows;
}

/********
 * \
 *
 *
 *
 */
function knightLogic(x, y) {
  const moves = [];

  const yCol = [y + 2, y - 2];
  const xCol = [x + 2, x - 2];

  for (let i = 0; i < 2; i++) {
    if (yCol[i] <= 8 && yCol[i] >= 1) {
      var xN = x + 1;

      if (xN <= 7 && xN >= 0) {
        moves.push(`${hash1[xN]}${yCol[i]}`);
      }

      xN = x - 1;

      if (xN <= 7 && xN >= 0) {
        moves.push(`${hash1[xN]}${yCol[i]}`);
      }
    }
  }

  for (let i = 0; i < 2; i++) {
    if (xCol[i] <= 7 && xCol[i] >= 0) {
      var yN = y + 1;

      if (yN >= 1 && yN <= 8) {
        moves.push(`${hash1[xCol[i]]}${yN}`);
      }

      yN = y - 1;

      if (yN >= 1 && yN <= 8) {
        moves.push(`${hash1[xCol[i]]}${yN}`);
      }
    }
  }

  return moves;
}

export { check };
//knight check is setup for look for black only check
