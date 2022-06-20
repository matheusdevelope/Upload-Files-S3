import * as FTPAPI from "../services/FtpAPI";
import { IFTP } from "../types/FTP";

function useFTP() {
  async function AddFTP(FTP: IFTP, token: string) {
    try {
      const ret: IFTP = await FTPAPI.RegisterFTP(FTP, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao adicionar FTP: " + e.data.message);
      return false;
    }
  }
  async function EditFTP(FTP: IFTP, token: string) {
    try {
      const ret: IFTP = await FTPAPI.EditFTP(FTP, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao editar FTP: " + e.data.message);
      return false;
    }
  }
  async function DeleteFTP(FTP: IFTP, token: string) {
    try {
      const ret = await FTPAPI.DeleteFTP(FTP, token);
      return ret;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao deletar FTP: " + e.data.message);
      return false;
    }
  }
  async function GetFTP(FTPID: string | undefined, token: string) {
    try {
      const FTP: IFTP[] = await FTPAPI.GetFTP(FTPID, token);
      return FTP;
    } catch (e: any) {
      console.error(e);
      alert("Falha ao listar FTP: " + e.data.message);
      return false;
    }
  }

  return {
    AddFTP,
    EditFTP,
    DeleteFTP,
    GetFTP,
  };
}

export default useFTP;
