import mongoose from "mongoose";

const ProductCategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export default mongoose.model("ProductCategories", ProductCategorySchema);
