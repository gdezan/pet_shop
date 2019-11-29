import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: String,
  zip_code: String,
  phone: String,
  isAdmin: { type: Boolean, default: false },
});

UserSchema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("Users", UserSchema);
