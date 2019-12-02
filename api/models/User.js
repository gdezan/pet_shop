import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const PetSchema = mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  imagePath: { type: String, default: null },
  services: [
    {
      serviceId: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
});

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: String,
  zipCode: String,
  phone: String,
  imagePath: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  pets: [PetSchema],
});

UserSchema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("Users", UserSchema);
