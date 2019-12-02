import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, default: null },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
    },
  },
});

export default mongoose.model("Services", ServiceSchema);
