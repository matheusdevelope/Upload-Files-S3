import * as R from "react";
import { IFTP } from "../../types/FTP";
import FormFTP from "../FormFTP";
import ListFTPs from "../ListFTP";
import * as C from "./style";

interface Props {
  FTPList: IFTP[];
  setFTPList: (FTPList: IFTP[]) => void;
  reset: boolean;
}

function AreaFTP({ FTPList, setFTPList, reset }: Props) {
  const [ftpToEdit, setFtpToEdit] = R.useState<IFTP>();
  const [Index, setIndex] = R.useState(0);

  function handleAddFTP(ftp: IFTP) {
    let newFTP = FTPList;
    newFTP.push(ftp);
    setFTPList([...newFTP]);
  }
  function handleSendEditFTPToForm(ftp: IFTP, key: number) {
    setIndex(key);
    setFtpToEdit({ ...ftp });
  }
  function handleEditFTP(ftp: IFTP, key?: number) {
    let copyList = FTPList;
    copyList.splice(key || Index, 1, ftp);
    Index > 0 && setIndex(0);
    setFTPList([...copyList]);
    setFtpToEdit(undefined);
  }
  function handleDeleteFTP(ftp: IFTP, key: number) {
    let copyList = FTPList;
    copyList.splice(key, 1);
    setFTPList([...copyList]);
  }

  return (
    <C.Container>
      <C.Header>Conexões FTP</C.Header>
      <ListFTPs
        FTPs={FTPList}
        handleSendEditFTPToForm={handleSendEditFTPToForm}
        handleEditFTP={handleEditFTP}
        handleDeleteFTP={handleDeleteFTP}
        DisableButtons={ftpToEdit}
      />
      <FormFTP
        handleAddFTP={handleAddFTP}
        handleEditFTP={handleEditFTP}
        FTPToEdit={ftpToEdit}
        reset={reset}
      />
    </C.Container>
  );
}
export default AreaFTP;
