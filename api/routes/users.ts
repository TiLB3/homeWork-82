import {Router} from "express";
import {Error} from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });

    user.generateToken();

    const saveUser = await user.save();
    res.cookie("token", saveUser.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.send(saveUser);
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
    return res.status(400).send({error: "User Not Found"});
  }

  const isMatch = await user.checkPassword(password);

  if (!isMatch) {
    return res.status(400).send({error: "Password is incorrect"});
  }

  user.generateToken();

  const saveUser = await user.save();
  res.cookie("token", saveUser.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.send({message: "Logged in successfully", user});
});

usersRouter.delete("/sessions", auth, async (req, res) => {
  const {user} = req as RequestWithUser;
  user.token = '';
  await user.save();

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.send({message: "Logged out successfully"});
});


export default usersRouter;