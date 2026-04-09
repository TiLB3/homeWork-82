import mongoose, {Document, HydratedDocument, Model} from "mongoose";
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

const UserSchema = new Schema<
  HydratedDocument<UserField>,
  UserModel,
  UserMethods,
  {}>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ["user", "admin"],
  },
  token: {
    type: String,
  }
});

UserSchema.path("username").validate({
  validator: async function (this: Document, value: string) {
    if (!this.isModified("username")) return true;
    const isExistUser = await User.findOne({username: value});

    if (isExistUser) return false;
    return true;

  },
  message: "Username already exists"
})

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
}

UserSchema.set("toJSON", {
  transform: (_doc, ret, _options) => {
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


const User = mongoose.model("User", UserSchema);
export default User;