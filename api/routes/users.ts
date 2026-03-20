import {NextFunction, Router} from "express";
import {Error} from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.generateToken();
    await user.save();
    res.send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    next(error);
  }
});

usersRouter.post("/sessions", async (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }
  const user = await User.findOne({username: username});

  if (!user) {
    return res.status(401).send({error: "User Not Found"});
  }

  const isMatch = await user.checkPassword(password);

  if (!isMatch) {
    return res.status(401).send({error: "Password is incorrect"});
  }

  user.generateToken();
  await user.save();

  res.send({message: "Logged in successfully", user});
});


export default usersRouter;