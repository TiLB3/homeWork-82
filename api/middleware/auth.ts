import {HydratedDocument} from "mongoose";
import {UserField} from "../types";
import {Request, RequestHandler} from "express";
import User from "../models/User";

export interface RequestWithUser extends Request {
  user: HydratedDocument<UserField>;
}

const auth: RequestHandler = async (expressReq, res, next) => {
  const req = expressReq as RequestWithUser;
  const token = req.get("Authorization");

  if(!token) {
    return res.status(401).send({error: "no token provided"});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: "not find user"});
  }

  req.user = user;
  next();
}

export default auth;