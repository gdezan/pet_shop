import mongoose from "mongoose";

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("UserSessions", UserSessionSchema);
