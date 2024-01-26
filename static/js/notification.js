import { playAudio } from "./socketClient.js";
function notification(check, finalemoves) {
  for (let key in check) {
    console.log(key);
  }
  for (let key in check) {
    console.log(key, "kry-----------");
    if (check[key] == "check" || check[key] == "check with pawn") {
      if (finalemoves.length == 0) {
        playAudio("./static/winchess.mp3");

        return "checkmate";
      }
      playAudio("./static/incorrect.mp3");

      alert("check");

      return "check";
    }
  }
  return "normal";
}

export { notification };
