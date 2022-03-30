import { IUser } from "../types/User";
import { Axios } from "./Axios";

function Header(token: string) {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}

export async function GetUser(userID: string | undefined, token: string) {
  try {
    const ret = await Axios.get(
      `/user${userID ? "/" + userID : ""}`,
      Header(token)
    );
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function RegisterUser(user: IUser, token: string) {
  try {
    const ret = await Axios.post("/user", user, Header(token));
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
export async function EditUser(user: IUser, token: string) {
  try {
    const ret = await Axios.put("/user/" + user.id, user, Header(token));
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}

export async function DeleteUser(user: IUser, token: string) {
  try {
    const ret = await Axios.delete("/user/" + user.id, Header(token));
    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
