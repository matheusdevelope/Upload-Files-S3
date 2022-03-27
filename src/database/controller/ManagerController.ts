import { NextFunction, Request, Response } from "express";
import { Manager } from "../entity/Manager";
import { AppDataSource } from "../data-source";
import { v4 as UUID } from "uuid";
export class ManagerController {
  private userRepository = AppDataSource.getRepository(Manager);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    request.body.id = UUID();
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({
      id: request.params.id,
    });
    await this.userRepository.remove(userToRemove);
  }
}
