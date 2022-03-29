import { IUser } from "../types/User";
import { Axios } from "./Axios";

export async function RegisterUser(user: IUser) {
  try {
    const ret = await Axios.post("/user", user);
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response.status);
  }
}
export async function EditUser(user: IUser) {
  try {
    const ret = await Axios.post("/user", user);
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response.status);
  }
}

export async function DeleteUser(user: IUser) {
  try {
    const ret = await Axios.post("/user", user);
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response.status);
  }
}
