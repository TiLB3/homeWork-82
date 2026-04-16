import {Router} from "express";
import {Error} from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import {config} from "../config";
import {OAuth2Client} from "google-auth-library";
import {imageUpload} from "../multer";

const usersRouter = Router();


usersRouter.post("/",imageUpload.single("avatar"), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      displayName: req.body.displayName,
      avatar: req.file ? "images/" + req.file.filename : null
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

usersRouter.post("/google", async (req, res, next) => {
  if (!req.body.credential) {
    return res.status(400).send({error: "Credential is required"});
  }

  const client = new OAuth2Client(config.client_id);

  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.client_id
    })

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: "Google login error!"});
    }

    const email = payload["email"];
    const id = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];

    if (!email) {
      return res
        .status(400)
        .send({error: "Not enough user data to continue"});
    }

    let user = await User.findOne({googleID: id});

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
        avatar
      })
    }

    user.generateToken();
    const saveUser = await user.save();
    res.cookie("token", saveUser.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.send({message: "Login with Google successful!", user});
  } catch (e) {
    next(e)
  }
})


export default usersRouter;