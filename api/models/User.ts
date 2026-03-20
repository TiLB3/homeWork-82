import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    const {password, ...rest} = ret;

    return rest;
  }
});


UserSchema.pre("save", async function () {
  if(!this.isModified("password")) return

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
});



const User = mongoose.model("User", UserSchema);
export default User;