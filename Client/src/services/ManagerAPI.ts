import { IManager, IUserBodyAuth } from "../types/Manager";
import { Axios } from "./Axios";

const baseURL = "/api/Manager";
function Header(token: string) {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}

export async function LoginManager(user: IUserBodyAuth) {
  try {
    const ret = await Axios.post("/api/manager/login", user);
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function GetManager(ManagerID: string | undefined, token: string) {
  try {
    const ret = await Axios.get(
      `${baseURL}${ManagerID ? "/" + ManagerID : ""}`,
      Header(token)
    );
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function RegisterManager(Manager: IManager, token: string) {
  try {
    const ret = await Axios.post(`${baseURL}`, Manager, Header(token));
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function EditManager(Manager: IManager, token: string) {
  try {
    const ret = await Axios.put(
      `${baseURL + "/"}` + Manager.id,
      Manager,
      Header(token)
    );
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function DeleteManager(Manager: IManager, token: string) {
  try {
    const ret = await Axios.delete(
      `${baseURL + "/"}` + Manager.id,
      Header(token)
    );
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
