import * as UserAPI from "../services/UsersAPI";
import { IUser } from "../types/User";

function useUser() {
  async function AddUser(user: IUser) {
    try {
      await UserAPI.RegisterUser(user);
      return true;
    } catch (e) {
      console.error(e);
      alert("Falha ao adicionar usuário");
      return false;
    }
  }
  async function EditUser(user: IUser) {
    try {
      await UserAPI.EditUser(user);
      return true;
    } catch (e) {
      console.error(e);
      alert("Falha ao adicionar usuário");
      return false;
    }
  }
  async function DeleteUser(user: IUser) {
    try {
      await UserAPI.DeleteUser(user);
      return true;
    } catch (e) {
      console.error(e);
      alert("Falha ao adicionar usuário");
      return false;
    }
  }

  return {
    AddUser,
    EditUser,
    DeleteUser,
  };
}

export default useUser;
