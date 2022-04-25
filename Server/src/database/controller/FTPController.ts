import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { v4 as UUID } from "uuid";
import { FTP } from "../entity/FTP";
export class UserController {
  private userRepository = AppDataSource.getRepository(FTP);
  async Exists(cnpj: string) {
    const user = await this.userRepository.findOneBy({ cnpj });
    if (user)
      return Promise.reject({
        message: "This CNPJ already exists",
      });
  }

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const user = await this.userRepository.find({
      where: {
        id: request.params.id,
      },
      relations: ["ftp"],
    });
    if (!user) return Promise.reject({ message: "User not found" });
    return Promise.resolve(user[0]);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      await this.Exists(request.body.cnpj);
      request.body.id = UUID();
      return this.userRepository.save(request.body);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      let userToUpdate = await this.userRepository.findOneBy({
        id: request.params.id,
      });
      if (!userToUpdate) return Promise.reject({ message: "User not found" });
      const user = await this.userRepository.findOneBy({
        cnpj: request.body.cnpj,
      });
      if (user && user.id !== request.params.id)
        return Promise.reject({
          message: "This CNPJ is already in use, try another.",
        });

      if (request.body.ftp?.length > 0) {
        const ftp = AppDataSource.getRepository(FTP);
        const objFTP = new FTP();
        await ftp.delete({ userId: request.body.id });
        for (let i = 0; i < request.body.ftp.length; i++) {
          let bodyFTP = request.body.ftp[i];
          objFTP.userId = request.body;
          await ftp.save({ ...objFTP, ...bodyFTP });
        }
      }
      delete request.body.ftp;

      return this.userRepository.update(
        {
          id: request.params.id,
        },
        request.body
      );
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({
      id: request.params.id,
    });
    if (!userToRemove) return Promise.reject({ message: "User not found" });
    return this.userRepository.remove(userToRemove);
  }
}