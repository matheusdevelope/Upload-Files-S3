import * as UserAPI from "../services/UsersAPI";
import { IUser } from "../types/User";

function useUser() {
  async function AddUser(user: IUser, token: string) {
    try {
      const ret: IUser = await UserAPI.RegisterUser(user, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao adicionar usuário: " + e.data.message);
      return false;
    }
  }
  async function EditUser(user: IUser, token: string) {
    try {
      const ret: IUser = await UserAPI.EditUser(user, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao editar usuário: " + e.data.message);
      return false;
    }
  }
  async function DeleteUser(user: IUser, token: string) {
    try {
      const ret = await UserAPI.DeleteUser(user, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao deletar usuário: " + e.data.message);
      return false;
    }
  }
  async function GetUser(userID: string | undefined, token: string) {
    try {
      const user: IUser[] = await UserAPI.GetUser(userID, token);
      return user;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao listar usuários: " + e.data.message);
      return false;
    }
  }

  return {
    AddUser,
    EditUser,
    DeleteUser,
    GetUser,
  };
}

export default useUser;
