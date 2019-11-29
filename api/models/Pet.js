import mongoose from "mongoose";

const PetSchema = mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
});

export default mongoose.model("Pets", PetSchema);
