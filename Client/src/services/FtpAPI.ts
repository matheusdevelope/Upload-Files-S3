import { IFTP } from "../types/FTP";
import { Axios } from "./Axios";

const baseURL = "/api/ftp";
function Header(token: string) {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}

export async function GetFTP(FTPID: string | undefined, token: string) {
  try {
    const ret = await Axios.get(
      `${baseURL}${FTPID ? "/" + FTPID : ""}`,
      Header(token)
    );
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function RegisterFTP(FTP: IFTP, token: string) {
  try {
    const ret = await Axios.post(`${baseURL}`, FTP, Header(token));
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function EditFTP(FTP: IFTP, token: string) {
  try {
    const ret = await Axios.put(
      `${baseURL + "/"}` + FTP.id,
      FTP,
      Header(token)
    );
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}

export async function DeleteFTP(FTP: IFTP, token: string) {
  try {
    const ret = await Axios.delete(`${baseURL + "/"}` + FTP.id, Header(token));
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
