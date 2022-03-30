import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import Config from "./configs";
import { UserController } from "./database/controller/UserController";

export default async function Middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  ///exclude this routes from check of token
  if (req.originalUrl === "/api/help" || req.originalUrl === "/manager/login")
    return next();

  //check if the user can access the api by requester property on body
  if (req.originalUrl === "/up_file_ftp") {
    if (!req.body.requester)
      return res.status(401).send({ message: "Requester not provided" });

    const User = await new UserController().Auth(req.body.requester);
    if (!User)
      return res
        .status(401)
        .send({ message: "The user don't have register to access API" });

    if (!User.allow_access)
      return res
        .status(401)
        .send({ message: "The user cannot access resources of API" });

    return next();
  }

  const authHeader: string = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No Token Provided" });

  const parts = authHeader.split(" ");

  if (!(parts.length === 2))
    return res.status(401).send({ error: "Token Error" });

  const [scheme, token] = parts;
  if (!/Bearer/i.test(scheme))
    return res.status(401).send({ error: "Token malformatted" });

  interface IPayload {
    id: string;
  }
  jwt.verify(token, Config.SECRET_JWT, (err, decoded: IPayload) => {
    if (err) return res.status(401).send({ error: "Invalid Token" });

    req.userId = decoded.id;
    return next();
  });
}