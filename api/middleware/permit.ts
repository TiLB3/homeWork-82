import {Response, Request, NextFunction} from "express";
import {RequestWithUser} from "./auth";


const permit = (...roles: string[]) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const {user} = expressReq as RequestWithUser;

    if(!user) {
      res.status(401).send({"message": "Unauthenticated"});
    }

    if(!roles.includes(user.role)) {
      res.status(403).send({"message": "Unauthorized"});
    }

    next();
  }
}

export default permit;