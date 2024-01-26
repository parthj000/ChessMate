const hash1 = ["a", "b", "c", "d", "e", "f", "g", "h"];

function allkingsmoves(boxIndex) {
  var y = boxIndex.split("")[1];
  var x = boxIndex.split("")[0];

  y = Number(y);
  for (let i = 0; i < 8; i++) {
    if (hash1[i] == x) {
      x = i;

      break;
    }
  }

  const movesKing = {
    straight_1: rook1(x, y)[0],
    straight_2: rook1(x, y)[1],
    straight_3: rook3(x, y)[0],
    straight_4: rook3(x, y)[1],
    diagonal_1: bishopLogic1(x, y)[0],
    diagonal_2: bishopLogic1(x, y)[1],

    diagonal_3: bishopLogic3(x, y)[0],

    diagonal_4: bishopLogic3(x, y)[1],
  };
  return movesKing;
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

    diagonaltwo.push(`${hash1[i]}${newY}`);
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

export { allkingsmoves, hash1 };
