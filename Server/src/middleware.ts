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
  console.log(req.body, req.originalUrl);
  if (req.originalUrl === "/help" || req.originalUrl === "/api/manager/login")
    return next();

  //check if the user can access the api by requester property on body
  if (req.originalUrl === "/up_file_ftp") {
    if (req.method === "GET") return next();
    if (!req.body.requester)
      return res.status(401).send({ message: "Requester not provided" });
    console.log("passou midleware 1");
    const User = await new UserController().Auth(req.body.requester);
    if (!User)
      return res
        .status(401)
        .send({ message: "The user don't have register to access API" });
    console.log("passou midleware 2");
    if (!User.allow_access)
      return res
        .status(401)
        .send({ message: "The user cannot access resources of API" });

    console.log("passou midleware 3");
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
