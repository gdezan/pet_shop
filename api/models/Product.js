import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, default: null },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
    },
  },
  discountedPrice: {
    type: Number,
    required: false,
    validate: {
      validator: Number.isInteger,
    },
    default: 0,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  qtyStock: {
    type: Number,
    default: 0,
  },
  qtySold: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Products", ProductSchema);
