import {HydratedDocument} from "mongoose";
import {UserField} from "../types";
import {Request, RequestHandler} from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import {config} from "../config";

export interface RequestWithUser extends Request {
  user: HydratedDocument<UserField>;
}

const auth: RequestHandler = async (expressReq, res, next) => {
  try {
    const req = expressReq as RequestWithUser;
    const token = req.get("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
      return res.status(401).send({error: "no token provided"});
    }

    const decoded = jwt.verify(token, config.jwt_secret) as { _id: string };

    const user = await User.findOne({_id: decoded._id, token});

    if (!user) {
      return res.status(401).send({error: "not find user"});
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({"message": "Token is invalid.Auntificate"});
  }
}

export default auth;