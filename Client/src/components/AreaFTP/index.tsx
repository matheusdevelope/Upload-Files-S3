import * as R from "react";
import { IFTP } from "../../types/FTP";
import { IUser } from "../../types/User";
import FormFTP from "../FormFTP";
import ListFTPs from "../ListFTP";
import * as C from "./style";

interface Props {
  FTPToEdit?: IUser;
}

function AreaFTP({ FTPToEdit }: Props) {
  const [FTP, setFTP] = R.useState<IFTP[]>([]);
  const [ftpToEdit, setFtpToEdit] = R.useState<IFTP>();

  function MaxId(ftp: IFTP) {
    if (FTP.length === 0) return 0;
    let IDs: number[] = [];
    FTP.forEach((obj) => {
      IDs.push(Number(obj.id));
    });
    return Math.max(...IDs);
  }

  function handleAddFTP(ftp: IFTP) {
    ftp.id = String(MaxId(ftp) + 1);
    let newFTP = FTP;
    newFTP.push(ftp);
    setFTP([...newFTP]);
  }

  function handleSendEditFTPToForm(ftp: IFTP) {
    setFtpToEdit({ ...ftp });
  }
  function handleEditFTP(ftp: IFTP) {
    const i = FTP.findIndex((obj, i) => obj.id === ftp.id);
    let copyList = FTP;
    copyList.splice(i, 1, ftp);
    setFTP([...copyList]);
    setFtpToEdit(undefined);
  }
  function handleDeleteFTP(ftp: IFTP) {
    const i = FTP.findIndex((obj, i) => obj.id === ftp.id);
    let copyList = FTP;
    copyList.splice(i, 1);
    setFTP([...copyList]);
  }

  return (
    <C.Container>
      <FormFTP
        handleAddFTP={handleAddFTP}
        handleEditFTP={handleEditFTP}
        FTPToEdit={ftpToEdit}
      />
      <ListFTPs
        FTPs={FTP}
        handleSendEditFTPToForm={handleSendEditFTPToForm}
        handleEditFTP={handleEditFTP}
        handleDeleteFTP={handleDeleteFTP}
        DisableButtons={ftpToEdit}
      />
    </C.Container>
  );
}
export default AreaFTP;
