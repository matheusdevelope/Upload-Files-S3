import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { v4 as UUID } from "uuid";
import { Log } from "../entity/Log";
import { Like } from "typeorm";

export interface ILog {
  id?: string;
  requester: string;
  type: string;
  sector: string;
  data: string;
  created_at?: Date;
}

export class LogController {
  private logRepository = AppDataSource.getRepository(Log);

  async all_no_pagination() {
    return this.logRepository.find();
  }
  async all(req: Request, response: Response, next: NextFunction) {

    const take = Number(req.body?.take) === 0 ? 50 : Math.floor(Number(req.body?.take))
    const skip = Math.floor(Number(req.body?.skip)) || 0
    const keyword = req.body?.keyword || ''
    try {
      const [result, total] = await this.logRepository.findAndCount(
        {
          where: { data: Like('%' + keyword + '%') }, order: { created_at: "DESC" },
          take: take,
          skip: skip
        }
      );
      return Promise.resolve({
        data: result,
        count: total
      })
    } catch (e) {
      Promise.reject({ error: e });
    }
  }

  async one(date: Date) {
    const log = await this.logRepository.find({
      where: {
        created_at: date
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
  async saveLog(req: Request) {
    const body: ILog = req.body
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
  async removeAll(request: Request, response: Response, next: NextFunction) {
    return this.logRepository.clear();
  }
}
