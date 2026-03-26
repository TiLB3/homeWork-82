import mongoose, {Model} from "mongoose";
import bcrypt from "bcrypt";
import {UserField} from "../types";
import {randomUUID} from "node:crypto";

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

interface UserMethods {
  checkPassword: (password: string) => Promise<boolean>;
  generateToken: () => void;
}

type UserModel = Model<UserField, {}, UserMethods>;

const UserSchema = new Schema<UserField, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (value: string) => {
        const isExistUser = await User.findOne({ username: value });

        if (isExistUser) return false;
        return true;
      },
      message: "Username already exists"
    }
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
}

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    const {password, ...rest} = ret;

    return rest;
  }
});


UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
});


const User = mongoose.model<UserField, UserModel>("User", UserSchema);
export default User;