import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { v4 as UUID } from "uuid";
import { Log } from "../entity/Log";

export interface ILog {
  id?: string;
  requester: string;
  type: string;
  sector: string;
  error: string;
  created_at?: Date;
}

export class LogController {
  private logRepository = AppDataSource.getRepository(Log);

  async all() {
    return this.logRepository.find();
  }

  async one(date: Date) {
    const log = await this.logRepository.find({
      where: {
        created_at: date,
      },
    });
    if (!log) return Promise.reject({ message: "log not found" });
    return Promise.resolve(log);
  }

  async save(body: ILog) {
    try {
      body.id = UUID();
      body.created_at = new Date();
      return this.logRepository.save(body);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let logToRemove = await this.logRepository.findOneBy({
      id: request.params.id,
    });
    if (!logToRemove) return Promise.reject({ message: "Log not found" });
    return this.logRepository.remove(logToRemove);
  }
}
