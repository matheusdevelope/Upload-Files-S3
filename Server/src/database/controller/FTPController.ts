import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { v4 as UUID } from "uuid";
import { FTP } from "../entity/FTP";
export class FtpController {
  private ftpRepository = AppDataSource.getRepository(FTP);
  async all(request: Request, response: Response, next: NextFunction) {
    return this.ftpRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const ftp = await this.ftpRepository.find({
      where: {
        id: request.params.id,
      },
    });
    if (!ftp) return Promise.reject({ message: "ftp not found" });
    return Promise.resolve(ftp[0]);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      request.body.id = UUID();
      return this.ftpRepository.save(request.body);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async remove(request: Request, response: Response, next: NextFunction) {
    let ftpToRemove = await this.ftpRepository.findOneBy({
      id: request.params.id,
    });
    if (!ftpToRemove) return Promise.reject({ message: "ftp not found" });
    return this.ftpRepository.remove(ftpToRemove);
  }
}
