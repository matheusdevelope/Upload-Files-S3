import { ILog, LogController } from "./database/controller/LogController";
const log = new LogController();

async function NewLog(props: ILog) {
  try {
    props.error = JSON.stringify(props.error);
    await log.save(props);
  } catch (e) {
    console.log("Erro ao salvar log", e);
  }
  return console.log("Fim Do Log");
}

async function GetLogs(date: Date | undefined) {
  try {
    if (date) return await log.one(date);
    return await log.all();
  } catch (e) {
    console.log("Erro ao listar logs", e);
  }
  return console.log("Fim Do Get Log");
}

module.exports = { NewLog, GetLogs };
