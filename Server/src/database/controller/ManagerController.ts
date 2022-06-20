import { NextFunction, Request, Response } from "express";
import { Manager } from "../entity/Manager";
import { AppDataSource } from "../data-source";
import { v4 as UUID } from "uuid";
import * as jwt from "jsonwebtoken";
import Config from "../../configs";
function generateToken(id: string) {
  return jwt.sign({ id }, Config.SECRET_JWT, {
    expiresIn: 60 * 60, //one hour
  });
}
export class ManagerController {
  private ManagerRepository = AppDataSource.getRepository(Manager);

  async login(req: Request, res: Response, next: NextFunction) {
    const { user, pass } = req.body;
    if (!user || !pass) return Promise.reject({ message: "Body empty" });

    let Manager = await this.ManagerRepository.findOneBy({ user });

    //verify if exist a user
    if (!Manager) {
      return Promise.reject({ message: "User not Found" });
    }
    //verify the pass of user founded
    if (Manager.pass.toString() !== pass.toString()) {
      return Promise.reject({ message: "Invalid Password" });
    }
    //return the user

    let ManagerToReturn: any = { ...Manager };
    delete ManagerToReturn.pass;
    const DataToReturn = {
      ...ManagerToReturn,
      token: generateToken(Manager.id),
    };

    return Promise.resolve(DataToReturn);
  }

  async FirstManager() {
    if ((await this.ManagerRepository.find()).length === 0) {
      await this.ManagerRepository.save({
        id: UUID(),
        user: "adm",
        pass: "adm",
        access: 0,
        name: "Administrator",
      });
    }
  }
  async Exists(user: string) {
    const manager = await this.ManagerRepository.findOneBy({
      user: user,
    });
    if (manager)
      return Promise.reject({
        message: "This user already exists",
      });
  }

  async all(request: Request, response: Response, next: NextFunction) {
    return this.ManagerRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const manager = await this.ManagerRepository.findOneBy({
      id: request.params.id,
    });
    if (!manager) return Promise.reject({ message: "User not found" });
    return Promise.resolve(manager);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      await this.Exists(request.body.user);
      request.body.id = UUID();
      return this.ManagerRepository.save(request.body);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      let managerToUpdate = await this.ManagerRepository.findOneBy({
        id: request.params.id,
      });
      if (!managerToUpdate)
        return Promise.reject({ message: "User not found" });
      const manager = await this.ManagerRepository.findOneBy({
        user: request.body.user,
      });
      if (manager && manager.id !== request.params.id)
        return Promise.reject({
          message: "This user is already in use, try another.",
        });
      return this.ManagerRepository.update(
        {
          id: request.params.id,
        },
        request.body
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.ManagerRepository.findOneBy({
      id: request.params.id,
    });
    if (!userToRemove) return Promise.reject({ message: "User not found" });
    return this.ManagerRepository.remove(userToRemove);
  }
}
