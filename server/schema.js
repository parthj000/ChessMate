import mongoose from "mongoose";

const Schema = mongoose.Schema({
  position: String,
  attacksquares: [String],
  friends: [String],
});

const model = mongoose.model("chessPieceDatabase", Schema);
const zeroPosition = {
  position: "a1",
  attacksquares: [],
  friends: [],
};

export { model };
