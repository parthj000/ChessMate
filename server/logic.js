const hash1 = ["a", "b", "c", "d", "e", "f", "g", "h"];

function movePrediction(power, boxIndex, race) {
  var y = boxIndex.split("")[1];
  var x = boxIndex.split("")[0];
  var moves = [];

  y = Number(y);
  for (let i = 0; i < 8; i++) {
    if (hash1[i] == x) {
      x = i;

      break;
    }
  }

  if (power === "bishop") {
    moves.push(bishopLogic1(x, y)[0]);
    moves.push(bishopLogic1(x, y)[1]);
    moves.push(bishopLogic3(x, y)[1]);
    moves.push(bishopLogic3(x, y)[0]);
  } else if (power === "rook") {
    moves.push(rook1(x, y)[0]);
    moves.push(rook1(x, y)[1]);
    moves.push(rook3(x, y)[1]);
    moves.push(rook3(x, y)[0]);
  } else if (power === "queen") {
    moves.push(rook1(x, y)[0]);
    moves.push(rook1(x, y)[1]);
    moves.push(rook3(x, y)[1]);
    moves.push(rook3(x, y)[0]);
    moves.push(bishopLogic1(x, y)[0]);
    moves.push(bishopLogic1(x, y)[1]);
    moves.push(bishopLogic3(x, y)[1]);
    moves.push(bishopLogic3(x, y)[0]);
  } else if (power === "knight") {
    moves.push(knightLogic(x, y));
  } else if (power == "pawn") {
    moves.push(pawnLogic(x, y, race));
  } else {
    moves.push(kingLogic(x, y));
  }
  console.log(moves, "--------moves");
  return moves;
}

function bishopLogic1(x, y) {
  const diagonalone = [];
  const diagonaltwo = [];

  //a linear equation we make
  // y-x=x+y;
  //here x ko ham 0 se 8 tak lejayenge or apne aap limitations khatam hojaengi

  for (let i = x + 1; i < 8; i++) {
    //this is x actually i from a to h;

    const k = y - x;
    const newY = i + k;

    if (newY < 1 || newY > 8) {
      break;
    }
    diagonalone.push(`${hash1[i]}${newY}`);
  }

  for (let i = x - 1; i >= 0; i--) {
    //this is x actually i from a to h;

    const k = y - x;
    const newY = i + k;

    if (newY < 1 || newY > 8) {
      break;
    }
    let id = `${hash1[i]}${newY}`;

    diagonaltwo.push(id);
  }
  return [diagonalone, diagonaltwo];
}

/*********
 *
 *
 *
 *
 *
 *
 */
function bishopLogic3(x, y) {
  const diagonalthree = [];
  const diagonalfour = [];

  for (let i = x + 1; i < 8; i++) {
    const k = x + y;
    const newY = k - i; //the eq is y=k-x
    if (newY < 1 || newY > 8) {
      break;
    }

    diagonalthree.push(`${hash1[i]}${newY}`);
  }

  for (let i = x - 1; i >= 0; i--) {
    const k = x + y;
    const newY = k - i; //the eq is y=k-x
    if (newY < 1 || newY > 8) {
      break;
    }

    diagonalfour.push(`${hash1[i]}${newY}`);
  }
  return [diagonalthree, diagonalfour];
}

function rook1(x, y) {
  const straightone = [];
  const straighttwo = [];

  for (let i = x + 1; i < 8; i++) {
    straightone.push(`${hash1[i]}${y}`);
  }
  for (let i = x - 1; i >= 0; i--) {
    straighttwo.push(`${hash1[i]}${y}`);
  }

  return [straightone, straighttwo];
}

function rook3(x, y) {
  const straightthree = [];
  const straightfour = [];

  for (let i = y + 1; i <= 8; i++) {
    straightthree.push(`${hash1[x]}${i}`);
  }
  for (let i = y - 1; i > 0; i--) {
    straightfour.push(`${hash1[x]}${i}`);
  }
  return [straightthree, straightfour];
}

/*******
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
        console.log(xN);
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
  console.log(moves, "knight--------------------moves");

  return moves;
}

function pawnLogic(x, y, race) {
  const moves = [];
  if (race == "white") {
    if (y == 2) {
      moves.push(`${hash1[x]}${y + 1}`);
      moves.push(`${hash1[x]}${y + 2}`);
      if (x - 1 >= 0 && y + 1 <= 8) moves.push(`${hash1[x - 1]}${y + 1}`);
      if (x + 1 < 8 && y + 1 <= 8) moves.push(`${hash1[x + 1]}${y + 1}`);

      return moves;
    }
    moves.push(`${hash1[x]}${y + 1}`);
    console.log(x - 1, y + 1);
    if (x - 1 >= 0 && y + 1 <= 8) moves.push(`${hash1[x - 1]}${y + 1}`);
    if (x + 1 < 8 && y + 1 <= 8) moves.push(`${hash1[x + 1]}${y + 1}`);
    return moves;
  }
  if (y == 7) {
    moves.push(`${hash1[x]}${y - 1}`);
    moves.push(`${hash1[x]}${y - 2}`);
    if (x + 1 < 8 && y - 1 > 0) moves.push(`${hash1[x + 1]}${y - 1}`);
    if (x - 1 >= 0 && y - 1 > 0) moves.push(`${hash1[x - 1]}${y - 1}`);

    return moves;
  }
  moves.push(`${hash1[x]}${y - 1}`);
  if (x + 1 < 8 && y - 1 > 0) moves.push(`${hash1[x + 1]}${y - 1}`);
  if (x - 1 >= 0 && y - 1 > 0) moves.push(`${hash1[x - 1]}${y - 1}`);
  return moves;
}

function kingLogic(x, y) {
  const cases = [
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y - 1],

    [x, y - 1],
    [x + 1, y - 1],
  ];
  const moves = [];
  for (let mini of cases) {
    if (mini[0] >= 0 && mini[0] < 8 && mini[1] >= 1 && mini[1] <= 8) {
      moves.push(`${hash1[mini[0]]}${mini[1]}`);
    }
  }
  console.log(moves, "------------oip");
  return moves;
}

export { movePrediction };
