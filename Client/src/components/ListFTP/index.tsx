import * as R from "react";
import { IFTP } from "../../types/FTP";
import * as C from "./style";
interface Props {
  FTPs: IFTP[];
  handleSendEditFTPToForm: (FTP: IFTP) => void;
  handleDeleteFTP: (FTP: IFTP) => void;
  handleEditFTP: (FTP: IFTP) => void;
  DisableButtons: IFTP | undefined;
}
function ListFTPs({
  FTPs,
  handleSendEditFTPToForm,
  handleDeleteFTP,
  handleEditFTP,
  DisableButtons,
}: Props) {
  function onChange(e: R.ChangeEvent<HTMLInputElement>, FTP: IFTP) {
    handleEditFTP({ ...FTP, deleteFiles: e.target.checked });
  }
  function RenderLine(FTP: IFTP, key: number) {
    return (
      <C.LineFTP key={key}>
        <p>{FTP.host}</p>
        <p>{FTP.user}</p>
        <p>{FTP.pass}</p>
        <p>{FTP.port}</p>
        <p>{FTP.path}</p>
        <p>{FTP.order}</p>
        <input
          type="checkbox"
          checked={FTP.deleteFiles}
          onChange={(e) => onChange(e, FTP)}
        />
        <div>
          <button
            disabled={Boolean(DisableButtons)}
            onClick={() => {
              handleSendEditFTPToForm(FTP);
            }}
          >
            Editar
          </button>
          <button
            disabled={Boolean(DisableButtons)}
            onClick={() => {
              handleDeleteFTP(FTP);
            }}
          >
            Excluir
          </button>
        </div>
      </C.LineFTP>
    );
  }
  return (
    <C.Container>
      <C.Tittles>
        <p>Nome</p>
        <p>CNPJ</p>
        <p>Expiração Arquivos</p>
        <p>Acessa API</p>
        <p>Ação</p>
      </C.Tittles>
      <ul>{FTPs.map(RenderLine)}</ul>
    </C.Container>
  );
}
export default ListFTPs;