import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./database/data-source";
import { Routes } from "./routes";
import Config from "./configs";
import Middleware from "./middleware";
import { ManagerController } from "./database/controller/ManagerController";

const PORT = Config.PORT;

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(Middleware);
    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          try {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next
            );

            if (result instanceof Promise) {
              result
                .then((result) => {
                  result !== null && result !== undefined
                    ? res.send(result)
                    : undefined;
                })
                .catch((e) => {
                  console.log(e);
                  res.status(400).json(e);
                });
            } else if (result instanceof Error) {
              res.json({ error: result, message: "Algo Deu Errado" });
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          } catch (e) {
            console.log(e);
            res.status(400).json({ error: e, message: "Algo Deu Errado" });
          }
        }
      );
    });

    await new ManagerController().FirstManager();

    app.listen(PORT | 3000, () => {
      console.log(
        `Express server has started on port ${PORT}. Open  http://localhost:${PORT}/ to see results`
      );
    });
  })
  .catch((error) => console.log(error));
