import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { v4 as UUID } from "uuid";
import { FTP } from "../entity/FTP";
export class FtpController {
  private ftpRepository = AppDataSource.getRepository(FTP);
  // async Exists(cnpj: string) {
  //   const ftp = await this.ftpRepository.findOneBy({ cnpj });
  //   if (ftp)
  //     return Promise.reject({
  //       message: "This CNPJ already exists",
  //     });
  // }

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
      //  await this.Exists(request.body.cnpj);
      request.body.id = UUID();
      return this.ftpRepository.save(request.body);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // async update(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     let ftpToUpdate = await this.ftpRepository.findOneBy({
  //       id: request.params.id,
  //     });
  //     if (!ftpToUpdate) return Promise.reject({ message: "ftp not found" });
  //     const ftp = await this.ftpRepository.findOneBy({
  //       cnpj: request.body.cnpj,
  //     });
  //     if (ftp && ftp.id !== request.params.id)
  //       return Promise.reject({
  //         message: "This CNPJ is already in use, try another.",
  //       });

  //     if (request.body.ftp?.length > 0) {
  //       const ftp = AppDataSource.getRepository(FTP);
  //       const objFTP = new FTP();
  //       await ftp.delete({ ftpId: request.body.id });
  //       for (let i = 0; i < request.body.ftp.length; i++) {
  //         let bodyFTP = request.body.ftp[i];
  //         objFTP.ftpId = request.body;
  //         await ftp.save({ ...objFTP, ...bodyFTP });
  //       }
  //     }
  //     delete request.body.ftp;

  //     return this.ftpRepository.update(
  //       {
  //         id: request.params.id,
  //       },
  //       request.body
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     return Promise.reject(e);
  //   }
  // }

  async remove(request: Request, response: Response, next: NextFunction) {
    let ftpToRemove = await this.ftpRepository.findOneBy({
      id: request.params.id,
    });
    if (!ftpToRemove) return Promise.reject({ message: "ftp not found" });
    return this.ftpRepository.remove(ftpToRemove);
  }
}
