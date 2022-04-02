import * as ManagerAPI from "../services/ManagerAPI";
import { IManager } from "../types/Manager";

function useManager() {
  async function AddManager(Manager: IManager, token: string) {
    try {
      const ret: IManager = await ManagerAPI.RegisterManager(Manager, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao adicionar administrador: " + e.data.message);
      return false;
    }
  }
  async function EditManager(Manager: IManager, token: string) {
    try {
      const ret: IManager = await ManagerAPI.EditManager(Manager, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao editar administrador: " + e.data.message);
      return false;
    }
  }
  async function DeleteManager(Manager: IManager, token: string) {
    try {
      const ret = await ManagerAPI.DeleteManager(Manager, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao deletar administrador: " + e.data.message);
      return false;
    }
  }
  async function GetManager(ManagerID: string | undefined, token: string) {
    try {
      const Manager: IManager[] = await ManagerAPI.GetManager(ManagerID, token);
      return Manager;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao listar administrador: " + e.data.message);
      return false;
    }
  }

  return {
    AddManager,
    EditManager,
    DeleteManager,
    GetManager,
  };
}

export default useManager;
