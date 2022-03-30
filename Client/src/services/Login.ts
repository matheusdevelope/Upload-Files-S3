import { Axios } from "./Axios";

interface IUserBodyAuth {
  user: string;
  pass: string;
}

export async function useLogin(user: IUserBodyAuth) {
  try {
    const ret = await Axios.post("/api/manager/login", user);

    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response);
  }
}
