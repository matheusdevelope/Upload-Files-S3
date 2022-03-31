import * as R from "react";
import { IFTP } from "../../types/FTP";
import * as C from "./style";
interface Props {
  FTPs: IFTP[];
  handleSendEditFTPToForm: (FTP: IFTP, key: number) => void;
  handleDeleteFTP: (FTP: IFTP, key: number) => void;
  handleEditFTP: (FTP: IFTP, key: number) => void;
  DisableButtons: IFTP | undefined;
}
function ListFTPs({
  FTPs,
  handleSendEditFTPToForm,
  handleDeleteFTP,
  handleEditFTP,
  DisableButtons,
}: Props) {
  function onChange(
    e: R.ChangeEvent<HTMLInputElement>,
    FTP: IFTP,
    key: number
  ) {
    handleEditFTP({ ...FTP, deleteFiles: e.target.checked }, key);
  }
  function RenderLine(FTP: IFTP, key: number) {
    return (
      <C.LineFTP key={key}>
        <div>
          <p className="host">{FTP.host}</p>
          <p className="user">{FTP.user}</p>
          <p className="pass">{FTP.pass}</p>
        </div>
        <div>
          <p className="path">{FTP.path}</p>
          <p className="port">{FTP.port}</p>
          <p className="order">{FTP.order}</p>
        </div>

        <div>
          <label htmlFor="deleteFiles">
            <input
              className="deleteFiles"
              disabled={Boolean(DisableButtons)}
              type="checkbox"
              checked={FTP.deleteFiles}
              onChange={(e) => onChange(e, FTP, key)}
            />
            Deletar Arquivos
          </label>

          <button
            disabled={Boolean(DisableButtons)}
            onClick={() => {
              handleSendEditFTPToForm(FTP, key);
            }}
          >
            Editar
          </button>
          <button
            disabled={Boolean(DisableButtons)}
            onClick={() => {
              handleDeleteFTP(FTP, key);
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
      <ul>{FTPs.map(RenderLine)}</ul>
    </C.Container>
  );
}
export default ListFTPs;
