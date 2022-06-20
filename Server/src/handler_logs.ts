import Config from "./configs";
import { LogController } from "./database/controller/LogController";
import { logger } from "./logger";
const log = new LogController();
interface ILogHandle {
  requester: string;
  type: string;
  sector: string;
  data: any;
}
function Info(props: ILogHandle) {
  Config.SHOW_LOGS === "true" && logger.info(props);
}
async function NewLog(props: ILogHandle, type?: string) {
  try {
    props.data = JSON.stringify(props.data).substring(0, 7999);

    type === "error" ? logger.error(props) : Info(props);
    await log.save(props);
  } catch (e) {
    logger.error(e);
  }
  return;
}

async function GetLogs(date: Date | undefined) {
  try {
    if (date) return await log.one(date);
    return await log.all();
  } catch (e) {
    logger.error(e);
  }
  return;
}

export { NewLog, GetLogs };
