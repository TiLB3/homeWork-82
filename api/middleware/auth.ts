import {HydratedDocument} from "mongoose";
import {UserField} from "../types";
import {Request, RequestHandler} from "express";
import User from "../models/User";
import jwt, {TokenExpiredError} from "jsonwebtoken";
import {config} from "../config";

export interface RequestWithUser extends Request {
  user: HydratedDocument<UserField>;
}

const auth: RequestHandler = async (expressReq, res, next) => {
  try {
    const req = expressReq as RequestWithUser;
    const jwtToken: string = req.cookies.token;

    if (!jwtToken) {
      return res.status(401).send({error: "no token provided"});
    }

    const decoded = jwt.verify(jwtToken, config.jwt_secret) as { _id: string };

    const user = await User.findOne({_id: decoded._id, token: jwtToken});

    if (!user) {
      return res.status(401).send({error: "not find user"});
    }

    req.user = user;
    next();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(401).send({"message": "you are toke is expired"});
    } else {
      return res.status(401).send({"message": "Token is invalid.Auntificate"});
    }

  }
}

export default auth;