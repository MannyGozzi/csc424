import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    job: {
      type: String,
      required: false,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: false
    },
    id: {
      type: String,
      trim: false
    },
    jwt: {
      type: String,
      required: true,
    },
    contacts: {
      type: Array,
      required: false,
    }
  },
  { collection: "users_list" },
);

export default mongoose.model("User", UserSchema);
export { UserSchema };
