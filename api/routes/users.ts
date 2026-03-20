import {NextFunction, Router} from "express";
import {Error} from "mongoose";
import User from "../models/User";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    await user.save();
    res.send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    next(error);
  }
})


export default usersRouter;