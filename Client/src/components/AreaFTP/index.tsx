import * as R from "react";
import { IFTP } from "../../types/FTP";
import { IUser } from "../../types/User";
import FormFTP from "../FormFTP";
import ListFTPs from "../ListFTP";
import * as C from "./style";

interface Props {
  FTPList: IFTP[];
  setFTPList: (FTPList: IFTP[]) => void;
}

function AreaFTP({ FTPList, setFTPList }: Props) {
  const [ftpToEdit, setFtpToEdit] = R.useState<IFTP>();
  const [Index, setIndex] = R.useState(0);

  function MaxId(ftp: IFTP) {
    if (FTPList.length === 0) return 0;
    let IDs: number[] = [];
    FTPList.forEach((obj) => {
      IDs.push(Number(obj.id));
    });
    return Math.max(...IDs);
  }

  function handleAddFTP(ftp: IFTP) {
    // ftp.id = String(MaxId(ftp) + 1);
    let newFTP = FTPList;
    newFTP.push(ftp);
    setFTPList([...newFTP]);
  }

  function handleSendEditFTPToForm(ftp: IFTP, key: number) {
    console.log(key);
    setIndex(key);
    setFtpToEdit({ ...ftp });
  }
  function handleEditFTP(ftp: IFTP, key?: number) {
    // const i = FTPList.findIndex((obj, i) => obj.id === ftp.id);
    let copyList = FTPList;
    copyList.splice(key || Index, 1, ftp);
    Index > 0 && setIndex(0);
    setFTPList([...copyList]);
    setFtpToEdit(undefined);
  }
  function handleDeleteFTP(ftp: IFTP, key: number) {
    //const i = FTPList.findIndex((obj, i) => obj.id === ftp.id);
    let copyList = FTPList;
    copyList.splice(key, 1);
    setFTPList([...copyList]);
  }

  return (
    <C.Container>
      <FormFTP
        handleAddFTP={handleAddFTP}
        handleEditFTP={handleEditFTP}
        FTPToEdit={ftpToEdit}
      />
      <ListFTPs
        FTPs={FTPList}
        handleSendEditFTPToForm={handleSendEditFTPToForm}
        handleEditFTP={handleEditFTP}
        handleDeleteFTP={handleDeleteFTP}
        DisableButtons={ftpToEdit}
      />
    </C.Container>
  );
}
export default AreaFTP;
