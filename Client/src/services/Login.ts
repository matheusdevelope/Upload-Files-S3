import { Axios } from "./Axios";

interface IUserBodyAuth {
  user: string;
  pass: string;
}

export async function useLogin(user: IUserBodyAuth) {
  ///debug
  return {
    user: "matheus",
    pass: "",
    access: 2,
    logged: true,
  };
  ///debug
  try {
    const ret = await Axios.post("/login", user);

    return ret.data;
  } catch (e: any) {
    console.error(e);
    return Promise.reject(e.response.status);
  }
}
