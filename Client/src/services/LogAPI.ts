
import { ILog, IPaginationLog } from "../types/Log";
import { Axios } from "./Axios";

const baseURL = "/api/log";
function Header(token: string) {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}
export async function GetLogs(body: IPaginationLog, token: string) {
  try {
    const ret = await Axios.post(
      `${baseURL}/get`, body, Header(token)
    );
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function NewLog(body: ILog, token: string) {
  try {
    const ret = await Axios.post(`${baseURL}/new`, body, Header(token));
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}

export async function DeleteLog(body: ILog, token: string) {
  try {
    const ret = await Axios.delete(
      `${baseURL + "/"}` + body.id,
      Header(token)
    );
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
