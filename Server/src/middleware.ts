import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import Config from "./configs";
import { UserController } from "./database/controller/UserController";
import { NewLog } from "./handler_logs";
import { logger } from "./logger";

export default async function Middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("aquii");
  function Send401(message: any) {
    NewLog({
      requester: req.body.requester || "system",
      type: "middleware",
      sector: "middleware",
      data: { message, req: req.body },
    }).finally(() => {
      return res.status(401).send({ error: message });
    });
    return;
  }
  ///exclude this routes from check of token
  if (req.originalUrl === "/help" || req.originalUrl === "/api/manager/login")
    return next();

  //check if the user can access the api by requester property on body
  if (req.originalUrl === "/up_file_ftp") {
    if (req.method === "GET") return next();
    if (!req.body.requester) return Send401("Requester not provided"); // res.status(401).send({ message: "Requester not provided" });
    const User = await new UserController().Auth(req.body.requester);
    if (!User) return Send401("The user don't have register to access API");
    // res
    //   .status(401)
    //   .send({ message: "The user don't have register to access API" });
    if (!User.allow_access)
      return Send401("The user cannot access resources of API");
    // res
    //   .status(401)
    //   .send({ message: "The user cannot access resources of API" });
    return next();
  }

  const authHeader: string = req.headers.authorization;

  if (!authHeader) return Send401("No Token Provided"); //res.status(401).send({ error: "No Token Provided" });

  const parts = authHeader.split(" ");

  if (!(parts.length === 2)) return Send401("Token Error"); // res.status(401).send({ error: "Token Error" });

  const [scheme, token] = parts;
  if (!/Bearer/i.test(scheme)) return Send401("Token malformatted"); // res.status(401).send({ error: "Token malformatted" });

  interface IPayload {
    id: string;
  }
  jwt.verify(token, Config.SECRET_JWT, (err, decoded: IPayload) => {
    if (err) return Send401("Invalid Token"); //res.status(401).send({ error: "Invalid Token" });

    req.userId = decoded.id;
    return next();
  });
}
