const hash1 = ["a", "b", "c", "d", "e", "f", "g", "h"];
console.log("this is coo;");

/******
 *
 * movePrediction(power,boxIndex);
 * param1 :
 *
 *
 */

function movePrediction(power, boxIndex) {
  const box = boxIndex.split("");
  // starting condition
  var x = box[0];
  var y = box[1];

  /******
   *
   * function to change the datatypes of x and y
   *
   */

  y = Number(y);
  for (let i = 0; i < 8; i++) {
    if (hash1[i] == x) {
      x = i;

      break;
    }
  }

  if (power == "blackpawn" || power == "whitepawn") {
    /****
     *
     * to change the push
     *
     *
     */

    const moves = [];

    if (y == 7 && power == "blackpawn") {
      // b2 to b4 or b2 is first position
      console.log("hii");
      moves.push(`${hash1[x]}6`);
      moves.push(`${hash1[x]}5`);

      return moves;
    } else if (y == 2 && power == "whitepawn") {
      console.log("hii");
      moves.push(`${hash1[x]}3`);
      moves.push(`${hash1[x]}4`);
      return moves;
    }

    moves.push(`${hash1[x + 1]}${y + 1}`);
    moves.push(`${hash1[x - 1]}${y + 1}`);
    moves.push(`${x}${y + 1}`);

    console.log(moves);
    return moves;
  } else if (power == "rook") {
    return rookLogic(x, y);
  } else if (power == "bishop") {
    return bishopLogic(x, y);
  } else if (power == "knight") {
    return knightLogic(x, y);
  } else if (power == "queen") {
    return queenLogic(x, y);
  }
}

function rookLogic(x, y) {
  const moves = [];
  for (let i = 0; i < 8; i++) {
    moves.push(`${hash1[i]}${y}`);
  }
  for (let i = 0; i < 8; i++) {
    moves.push(`${hash1[x]}${i + 1}`);
  }
  console.log(moves);
  return moves;
}

function bishopLogic(x, y) {
  const moves = [];
  //a linear equation we make
  // y-x=x+y;
  //here x ko ham 0 se 8 tak lejayenge or apne aap limitations khatam hojaengi

  for (let i = 0; i < 8; i++) {
    //this is x actually i from a to h;
    const k = y - x;
    const newY = i + k;

    // console.log(k, newY);
    if (newY >= 1 && newY <= 8) {
      moves.push(`${hash1[i]}${newY}`);
    }
    console.log("hi", moves);
  }
  /****
   *
   * now discuss the downfalling graph with slope -1;
   */
  for (let i = 0; i < 8; i++) {
    const k = x + y;
    const newY = k - i; //the eq is y=k-x
    console.log(newY, k, "---------------------------------------------------");
    if (newY >= 1 && newY <= 8) {
      moves.push(`${hash1[i]}${newY}`);
    }
    console.log("hi", moves);
  }

  return moves;
}
/*****
 *
 *
 *
 * the knight logic
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
        console.log(xN);
        moves.push(`${hash1[xN]}${yCol[i]}`);
      }
    }
  }
  console.log(moves, "-----knight");

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
  console.log(moves);

  return moves;
}
/****
 *
 *
 *
 * **
 * queen logic
 */
function queenLogic(x, y) {
  const bishop = bishopLogic(x, y);
  const rook = rookLogic(x, y);
  const queen = bishop.concat(rook);
  return queen;
}
export { movePrediction };
