import * as UserAPI from "../services/UsersAPI";
import { IUser } from "../types/User";

function useUser() {
  async function AddUser(user: IUser, token: string) {
    try {
      await UserAPI.RegisterUser(user, token);
      return true;
    } catch (e) {
      console.error(e);
      alert("Falha ao adicionar usuário");
      return false;
    }
  }
  async function EditUser(user: IUser, token: string) {
    try {
      await UserAPI.EditUser(user, token);
      return true;
    } catch (e) {
      console.error(e);
      alert("Falha ao editar usuário");
      return false;
    }
  }
  async function DeleteUser(user: IUser, token: string) {
    try {
      await UserAPI.DeleteUser(user, token);
      return true;
    } catch (e) {
      console.error(e);
      alert("Falha ao deletar usuário");
      return false;
    }
  }
  async function GetUser(userID: string | undefined, token: string) {
    try {
      const user: IUser[] = await UserAPI.GetUser(userID, token);
      return user;
    } catch (e) {
      console.error(e);
      alert("Falha ao listar usuários");
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
