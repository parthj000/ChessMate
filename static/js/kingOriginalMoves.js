function finaleMoves(initialMoves) {
  const mock = initialMoves;
  const kingOriginalMoves = [];
  const map = {
    straight_1: "straight_2",
    straight_2: "straight_1",
    straight_3: "straight_4",
    straight_4: "straight_3",
    diagonal_1: "diagonal_2",
    diagonal_2: "diagonal_1",
    diagonal_3: "diagonal_4",
    diagonal_4: "diagonal_3",
  };

  for (let key in mock) {
    if (mock[key] == "check with pawn") {
      delete mock[key];
      continue;
    } else if (key == "knightCheck") {
      delete mock[key];
      continue;
    } else if (mock[key] === "check") {
      const newelem = map[key];

      //if the corresponding element is undefined;
      if (newelem == undefined) {
        delete mock[key];
        continue;
      }

      delete mock[newelem];
      delete mock[key];
      continue;
    }
  }

  for (let key in mock) {
    const mini = mock[key].split(" ");
    if (mini.pop() == "yes") {
      kingOriginalMoves.push(mini[4]);
    }
  }
  console.log(mock, "----------mock");
  console.log(kingOriginalMoves, "-------------finaleMovesof King");
  return kingOriginalMoves;
}
export { finaleMoves };
