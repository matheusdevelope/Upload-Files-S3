import { NextFunction, Request, Response } from "express";
import { Manager } from "../entity/Manager";
import { AppDataSource } from "../data-source";
import { v4 as UUID } from "uuid";

function HandleError(func: any) {
  try {
    return func();
  } catch (e) {}
}

export class ManagerController {
  private ManagerRepository = AppDataSource.getRepository(Manager);

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
